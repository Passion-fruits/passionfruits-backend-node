import { IsNumber, IsString } from 'class-validator';

export class SuccessPaymentDto {
  @IsString()
  payment_key: string;

  @IsString()
  order_id: string;

  @IsNumber()
  amount: number;
}
