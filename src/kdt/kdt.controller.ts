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
import { AnswerDonateDto } from './dto/answer-donate.dto';
import { GetDonateHistoryResponseData } from './dto/donate-history.dto';
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
  @Get('history/charge')
  public getKdtHistory(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<GetKdtHistoryResponseData> {
    return this.kdtService.getKdtHistory(page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('history/donate')
  public getDonateHistory(
    @Query('done') done: number,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<GetDonateHistoryResponseData> {
    return this.kdtService.getDonateHistory(done, page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('history/answer')
  public getAnswerHistory(
    @Query('done') done: number,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<GetDonateHistoryResponseData> {
    return this.kdtService.getAnswerHistory(done, page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post('donate')
  public async donateKdt(@Body() dto: DonateKdtRequest): Promise<void> {
    await this.kdtService.donateKdt(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post('answer')
  public async answerDonate(@Body() dto: AnswerDonateDto): Promise<void> {
    await this.kdtService.answerDonate(dto);
  }

  @Get('wallet/random')
  public async getRandomWallet(): Promise<GetRandomWalletResponseData> {
    return await this.kdtService.getRandomWallet();
  }
}
