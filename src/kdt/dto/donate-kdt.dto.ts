import { IsNumber, IsString } from 'class-validator';

export class DonateKdtRequest {
  @IsNumber()
  artist_id: number;

  @IsNumber()
  amount: number;

  @IsString()
  question: string;
}
