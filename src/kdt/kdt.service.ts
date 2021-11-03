import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { caver, KIP7 } from 'src/config/caver';
import { Profile } from 'src/profile/entity/profile.entity';
import { ProfileRepository } from 'src/profile/entity/profile.repository';
import {
  AlreadyPaymentedException,
  NotFoundKdtHistoryException,
} from 'src/shared/exception/exception.index';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { DonateKdtRequest } from './dto/donate-kdt.dto';
import { GetKdtDetailResponseData } from './dto/get-kdt-detail.dto';
import { GetKdtHistoryResponseData } from './dto/get-kdt-history.dto';
import { GetRandomWalletResponseData } from './dto/get-random-wallet.dto';
import { SuccessPaymentDto } from './dto/success-payment.dto';
import { KdtHistory } from './entity/kdt-history.entity';
import { KdtHistoryRepository } from './entity/kdt-history.repository';
import { Kdt } from './entity/kdt.entity';
import { KdtRepository } from './entity/kdt.repository';

@Injectable()
export class KdtService {
  constructor(
    @InjectRepository(Kdt) private readonly kdtRepository: KdtRepository,
    @InjectRepository(KdtHistory)
    private readonly kdtHistoryRepository: KdtHistoryRepository,
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
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

    const userAccount = await this.profileRepository.findOne({
      select: ['wallet'],
      where: { user_id: this.request.user.sub },
    });
    const kdtAmount = (dto.amount * 10) / 12 / 100;

    const txRes = await KIP7.transfer(
      userAccount,
      Math.pow(10, 18) * kdtAmount,
      {
        from: process.env.FEE_PAYER_ADDRESS,
        feeDelegation: true,
        feePayer: process.env.FEE_PAYER_ADDRESS,
      },
    );

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

  public async donateKdt(dto: DonateKdtRequest): Promise<void> {}

  public async getRandomWallet(): Promise<GetRandomWalletResponseData> {
    const keyring = caver.wallet.getKeyring(caver.wallet.generate(1)[0]);
    return {
      address: keyring._address,
      private_key: keyring._key['_privateKey'],
    };
  }
}
