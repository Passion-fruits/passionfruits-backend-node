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
import { GetKdtDetailResponseData } from './dto/get-kdt-detail.dto';
import { SuccessPaymentRequest } from './dto/success-payment.dto';
import { KdtService } from './kdt.service';

@Controller('kdt')
export class KdtController {
  constructor(private readonly kdtService: KdtService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async successPayment(
    @Body() dto: SuccessPaymentRequest,
  ): Promise<void> {
    await this.kdtService.successPayment(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public getKdtDetail(): Promise<GetKdtDetailResponseData> {
    return this.kdtService.getKdtDetail();
  }
}
