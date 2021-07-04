import { IsString, IsUrl, Length } from 'class-validator';

export class ModifyProfileDto {
  @IsString()
  @Length(4, 30)
  name: string;

  @IsString()
  @Length(0, 250)
  bio: string;

  @IsString()
  @Length(0, 150)
  @IsUrl()
  insta: string;

  @IsString()
  @Length(0, 150)
  @IsUrl()
  facebook: string;

  @IsString()
  @Length(0, 150)
  @IsUrl()
  soundcloud: string;

  @IsString()
  @Length(0, 150)
  @IsUrl()
  youtube: string;
}

export class ModifyProfileResponseData {
  name: string;
  bio: string;
  insta: string;
  facebook: string;
  soundcloud: string;
  youtube: string;
}
