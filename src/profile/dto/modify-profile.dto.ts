import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class ModifyProfileDto {
  @IsString()
  @Length(2, 30)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 250)
  bio: string;

  @IsOptional()
  @IsString()
  @Length(0, 150)
  insta: string;

  @IsOptional()
  @IsString()
  @Length(0, 150)
  facebook: string;

  @IsOptional()
  @IsString()
  @Length(0, 150)
  soundcloud: string;

  @IsOptional()
  @IsString()
  @Length(0, 150)
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
