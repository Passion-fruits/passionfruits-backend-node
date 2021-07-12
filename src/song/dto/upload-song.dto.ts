import { IsNumberString, IsString, Length } from 'class-validator';

export class UploadSongDto {
  @Length(1, 30)
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumberString()
  genre: number;

  @IsNumberString()
  mood: number;

  @IsNumberString()
  duration: number;
}

export class UploadSongResponseData {
  message: string;
}
