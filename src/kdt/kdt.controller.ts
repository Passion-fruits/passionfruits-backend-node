import {
  Body,
  Controller,
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
  public successPayment(
    @Query('paymentKey') paymentKey: string,
    @Query('orderId') orderId: string,
    @Query('amount') amount: number,
  ): void {
    this.kdtService.successPayment(paymentKey, orderId, amount);
  }
}
