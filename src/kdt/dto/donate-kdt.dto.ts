import { IsNumber, IsString } from 'class-validator';

export class DonateKdtRequest {
  @IsNumber()
  amount: number;

  @IsString()
  question: string;

  @IsString()
  address: string;
}
