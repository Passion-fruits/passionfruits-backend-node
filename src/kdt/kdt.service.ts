import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { KdtHistoryRepository } from './entity/kdt-history.repository';
import { Kdt } from './entity/kdt.entity';
import { KdtRepository } from './entity/kdt.repository';

@Injectable()
export class KdtService {
  constructor(
    @InjectRepository(Kdt) private readonly kdtRepository: KdtRepository,
    @InjectRepository(KdtRepository)
    private readonly kdtHistoryRepository: KdtHistoryRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public successPayment(
    paymentKey: string,
    orderId: string,
    amount: number,
  ): void {
    axios({
      method: 'post',
      url: `https://api.tosspayments.com/v1/payments/${paymentKey}`,
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64'),
        'Content-Type': 'application/json',
      },
      data: {
        orderId: orderId,
        amount: amount,
      },
    }).then(async (res) => {
      const kdtAmount = (amount * 10) / 12 / 100;
      await this.kdtRepository.successPayment(kdtAmount, this.request.user.sub);
      await this.kdtHistoryRepository.accessPayment(
        orderId,
        paymentKey,
        kdtAmount,
        this.request.user.sub,
      );
      console.log(res);
    });
  }
}
