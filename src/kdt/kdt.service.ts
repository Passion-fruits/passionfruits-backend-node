import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { randomInt } from 'crypto';
import { caver, kdtContract, KIP7 } from 'src/config/caver';
import { Profile } from 'src/profile/entity/profile.entity';
import { ProfileRepository } from 'src/profile/entity/profile.repository';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import {
  AlreadyPaymentedException,
  InsufficientBalanceException,
  NotFoundKdtHistoryException,
  QueryBadRequest,
  SameNonceTxPoolException,
} from 'src/shared/exception/exception.index';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { AnswerDonateDto } from './dto/answer-donate.dto';
import { GetDonateHistoryResponseData } from './dto/donate-history.dto';
import { DonateKdtRequest } from './dto/donate-kdt.dto';
import { GetKdtDetailResponseData } from './dto/get-kdt-detail.dto';
import { GetKdtHistoryResponseData } from './dto/get-kdt-history.dto';
import { GetRandomWalletResponseData } from './dto/get-random-wallet.dto';
import { SuccessPaymentDto } from './dto/success-payment.dto';
import { KdtHistory } from './entity/kdt-history/kdt-history.entity';
import { KdtHistoryRepository } from './entity/kdt-history/kdt-history.repository';
import { Kdt } from './entity/kdt/kdt.entity';
import { KdtRepository } from './entity/kdt/kdt.repository';
import { Message } from './entity/message/message.entity';
import { MessageRepository } from './entity/message/message.repository';

@Injectable()
export class KdtService {
  constructor(
    @InjectRepository(Kdt) private readonly kdtRepository: KdtRepository,
    @InjectRepository(KdtHistory)
    private readonly kdtHistoryRepository: KdtHistoryRepository,
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Message)
    private readonly messageRepository: MessageRepository,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  public async successPayment(dto: SuccessPaymentDto): Promise<void> {
    try {
      await axios({
        method: 'post',
        url: `https://api.tosspayments.com/v1/payments/${dto.payment_key}`,
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64'),
          'Content-Type': 'application/json',
        },
        data: {
          orderId: dto.order_id,
          amount: dto.amount,
        },
      });
    } catch (err) {
      throw AlreadyPaymentedException;
    }

    const { wallet } = await this.profileRepository.findAccountById(
      this.request.user.sub,
    );
    const kdtAmount = (dto.amount * 10) / 12 / 100;

    const txRes = await KIP7.transfer(wallet, Math.pow(10, 18) * kdtAmount, {
      from: process.env.FEE_PAYER_ADDRESS,
      feeDelegation: true,
      feePayer: process.env.FEE_PAYER_ADDRESS,
    });

    await this.kdtRepository.successPayment(kdtAmount, this.request.user.sub);

    await this.kdtHistoryRepository.successPayment(
      dto.order_id,
      dto.payment_key,
      kdtAmount,
      this.request.user.sub,
      txRes.events.Transfer.transactionHash,
    );
  }

  public async getKdtDetail(): Promise<GetKdtDetailResponseData> {
    const { user_id, ...res } = await this.kdtRepository.findOne(
      this.request.user.sub,
    );
    const { wallet } = await this.profileRepository.findAccountById(user_id);

    const add_kdt = parseInt(res.add_kdt.toString());
    const donate_kdt = parseInt(res.donate_kdt.toString());
    const reward_kdt = parseInt(res.reward_kdt.toString());
    const total_kdt = parseInt(await KIP7.balanceOf(wallet));

    return {
      add_kdt,
      donate_kdt,
      reward_kdt,
      total_kdt,
    };
  }

  public async getKdtHistory(): Promise<GetKdtHistoryResponseData> {
    const historyRecords = await this.kdtHistoryRepository.getKdtHistory(
      this.request.user.sub,
    );
    if (historyRecords.length === 0) throw NotFoundKdtHistoryException;
    return { history: historyRecords };
  }

  public async getDonateHistory(
    done: number,
  ): Promise<GetDonateHistoryResponseData> {
    if (!(done === 1 || done === 0)) throw QueryBadRequest;

    const historyRecords = await this.kdtHistoryRepository.getDonateHistory(
      this.request.user.sub,
      done,
    );
    if (historyRecords.length === 0) throw NotFoundKdtHistoryException;
    return { history: historyRecords };
  }

  public async getAnswerHistory(
    done: number,
  ): Promise<GetDonateHistoryResponseData> {
    if (!(done === 1 || done === 0)) throw QueryBadRequest;

    const historyRecords = await this.kdtHistoryRepository.getAnswerHistory(
      this.request.user.sub,
      done,
    );
    if (historyRecords.length === 0) throw NotFoundKdtHistoryException;
    return { history: historyRecords };
  }

  public async donateKdt(dto: DonateKdtRequest): Promise<void> {
    const { wallet: userWallet } = await this.profileRepository.findAccountById(
      this.request.user.sub,
    );
    const { wallet: artistWallet } =
      await this.profileRepository.findAccountById(dto.artist_id);
    const { private_key } = await this.userRepository.findPrivateKeyById(
      this.request.user.sub,
    );
    const balance = await KIP7.balanceOf(userWallet);

    if (balance < dto.amount * Math.pow(10, 18))
      throw InsufficientBalanceException;

    if (!caver.wallet.getKeyring(userWallet)) {
      caver.wallet.add(
        new caver.wallet.keyring.singleKeyring(userWallet, private_key),
      );
    }

    const messageIdx = await kdtContract.call('msgIdx');

    const txRes = await kdtContract.methods
      .registerSponser(artistWallet, dto.question, dto.amount)
      .send({
        from: userWallet,
        gas: 3000000,
        feeDelegation: true,
        feePayer: process.env.FEE_PAYER_ADDRESS,
      })
      .catch((err) => {
        console.error(err);
        throw SameNonceTxPoolException;
      });

    //todo 트랜잭션 묶기
    await this.messageRepository.donateKdt(
      messageIdx,
      dto.question,
      this.request.user.sub,
      dto.artist_id,
    );

    await this.kdtHistoryRepository.donateKdt(
      messageIdx,
      dto.amount,
      this.request.user.sub,
      txRes.events.Transfer.transactionHash,
    );
  }

  public async answerDonate(dto: AnswerDonateDto): Promise<void> {
    const { wallet: artistWallet } =
      await this.profileRepository.findAccountById(this.request.user.sub);
    const { wallet: donateUserWallet } =
      await this.profileRepository.findAccountById(dto.donate_user_id);
    const { private_key } = await this.userRepository.findPrivateKeyById(
      this.request.user.sub,
    );

    if (!caver.wallet.getKeyring(artistWallet)) {
      caver.wallet.add(
        new caver.wallet.keyring.singleKeyring(artistWallet, private_key),
      );
    }

    const txRes = await kdtContract.methods
      .answerArtist(donateUserWallet, dto.answer, dto.message_id)
      .send({
        from: artistWallet,
        gas: 3000000,
        feeDelegation: true,
        feePayer: process.env.FEE_PAYER_ADDRESS,
      })
      .catch((err) => {
        console.error(err);
        throw SameNonceTxPoolException;
      });

    await this.messageRepository.answerDonate(
      dto.message_id,
      dto.answer,
      txRes.events.Transfer.transactionHash,
    );
  }

  public async getRandomWallet(): Promise<GetRandomWalletResponseData> {
    const keyring = caver.wallet.getKeyring(caver.wallet.generate(1)[0]);
    return {
      address: keyring._address,
      private_key: keyring._key['_privateKey'],
    };
  }
}
