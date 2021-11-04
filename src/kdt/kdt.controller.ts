import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DonateKdtRequest } from './dto/donate-kdt.dto';
import { GetKdtDetailResponseData } from './dto/get-kdt-detail.dto';
import { GetKdtHistoryResponseData } from './dto/get-kdt-history.dto';
import { GetRandomWalletResponseData } from './dto/get-random-wallet.dto';
import { SuccessPaymentDto } from './dto/success-payment.dto';

import { KdtService } from './kdt.service';

@Controller('kdt')
export class KdtController {
  constructor(private readonly kdtService: KdtService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async successPayment(@Body() dto: SuccessPaymentDto): Promise<void> {
    await this.kdtService.successPayment(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public getKdtDetail(): Promise<GetKdtDetailResponseData> {
    return this.kdtService.getKdtDetail();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('history')
  public getKdtHistory(): Promise<GetKdtHistoryResponseData> {
    return this.kdtService.getKdtHistory();
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post('donate')
  public async donateKdt(@Body() dto: DonateKdtRequest): Promise<void> {
    await this.kdtService.donateKdt(dto);
  }

  @Get('wallet/random')
  public async getRandomWallet(): Promise<GetRandomWalletResponseData> {
    return await this.kdtService.getRandomWallet();
  }
}
