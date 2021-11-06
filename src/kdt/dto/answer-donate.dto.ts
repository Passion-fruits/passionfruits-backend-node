import { IsNumber, IsString } from 'class-validator';

export class AnswerDonateDto {
  @IsString()
  answer: string;

  @IsNumber()
  message_id: number;

  @IsNumber()
  donate_user_id: number;
}
