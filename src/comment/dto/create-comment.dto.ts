import { IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  song_id: number;

  @IsString()
  @Length(1, 200)
  content: string;
}
