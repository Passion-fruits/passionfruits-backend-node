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
import { KdtService } from './kdt.service';

@Controller('kdt')
export class KdtController {
  constructor(private readonly kdtService: KdtService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async successPayment(
    @Query('paymentKey') paymentKey: string,
    @Query('orderId') orderId: string,
    @Query('amount') amount: number,
  ): Promise<void> {
    await this.kdtService.successPayment(paymentKey, orderId, amount);
  }
}
