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
  SameNonceTxPoolException,
} from 'src/shared/exception/exception.index';
import { IUserReqeust } from 'src/shared/interface/request.interface';
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

    return {
      add_kdt: parseInt(res.add_kdt.toString()),
      donate_kdt: parseInt(res.donate_kdt.toString()),
    };
  }

  public async getKdtHistory(): Promise<GetKdtHistoryResponseData> {
    const historyRecords = await this.kdtHistoryRepository.getKdtHistory(
      this.request.user.sub,
    );
    if (historyRecords.length === 0) throw NotFoundKdtHistoryException;
    return { history: historyRecords };
  }

  public async getDonateHistory(): Promise<GetDonateHistoryResponseData> {
    const historyRecords = await this.kdtHistoryRepository.getDonateHistory(
      this.request.user.sub,
    );
    if (historyRecords.length === 0) throw NotFoundKdtHistoryException;
    return { history: historyRecords };
  }

  public async getAnswerHistory(): Promise<GetDonateHistoryResponseData> {
    const historyRecords = await this.kdtHistoryRepository.getAnswerHistory(
      this.request.user.sub,
    );
    if (historyRecords.length === 0) throw NotFoundKdtHistoryException;
    return { history: historyRecords };
  }

  public async donateKdt(dto: DonateKdtRequest): Promise<void> {
    const { wallet } = await this.profileRepository.findAccountById(
      this.request.user.sub,
    );
    const { private_key } = await this.userRepository.findPrivateKeyById(
      this.request.user.sub,
    );
    const balance = await KIP7.balanceOf(wallet);

    if (balance < dto.amount * Math.pow(10, 18))
      throw InsufficientBalanceException;

    const keyring = new caver.wallet.keyring.singleKeyring(wallet, private_key);
    caver.wallet.updateKeyring(keyring);

    const txRes = await kdtContract.methods
      .registerSponser(dto.address, dto.question, dto.amount)
      .send({
        from: wallet,
        gas: 3000000,
        feeDelegation: true,
        feePayer: process.env.FEE_PAYER_ADDRESS,
      })
      .catch((err) => {
        console.error(err);
        throw SameNonceTxPoolException;
      });

    const messageIdx = await kdtContract.call('msgIdx');

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

  public async getRandomWallet(): Promise<GetRandomWalletResponseData> {
    const keyring = caver.wallet.getKeyring(caver.wallet.generate(1)[0]);
    return {
      address: keyring._address,
      private_key: keyring._key['_privateKey'],
    };
  }
}
