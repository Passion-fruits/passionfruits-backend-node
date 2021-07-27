import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { IMulterFile } from '../shared/interface/request.interface';
import { ProfileMulterConfigs } from '../config/multer';
import { GetProfileResponseData } from './dto/get-profile.dto';
import {
  ModifyProfileResponseData,
  ModifyProfileDto,
} from './dto/modify-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':user_id')
  public async getProfile(
    @Param('user_id') user_id: number,
    @Headers('Authorization') token: string,
  ): Promise<GetProfileResponseData> {
    return await this.profileService.getProfile(user_id, token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  public async modifyProfile(
    @Body() dto: ModifyProfileDto,
  ): Promise<ModifyProfileResponseData> {
    return await this.profileService.modifyProfile(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getMyProfile(): Promise<GetProfileResponseData> {
    return await this.profileService.getMyProfile();
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image', ProfileMulterConfigs))
  @Put('image')
  public async modifyProfileImage(
    @UploadedFile() file: IMulterFile,
  ): Promise<{ image_path: string }> {
    await this.profileService.modifyProfileImage(file.location);
    return { image_path: file.location };
  }
}
