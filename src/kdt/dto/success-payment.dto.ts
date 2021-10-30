import { IsString } from 'class-validator';

export class SuccessPaymentRequest {
  @IsString()
  payment_key: string;

  @IsString()
  order_id: string;

  @IsString()
  to_address: string;

  amount: number;
}
