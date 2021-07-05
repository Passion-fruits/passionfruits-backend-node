import { IsNumberString, IsString, Length } from 'class-validator';
import { User } from '../../shared/entity/user/user.entity';

export class UploadSongDto {
  @Length(4, 30)
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
