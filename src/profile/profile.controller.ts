import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { IMulterFile } from '../shared/interface/request.interface';
import { MulterConfigs } from '../config/multer';
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
  ): Promise<GetProfileResponseData> {
    return await this.profileService.getProfile(user_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  public async modifyProfile(
    @UploadedFile() file: IMulterFile,
    @Body() dto: ModifyProfileDto,
  ): Promise<ModifyProfileResponseData> {
    return await this.profileService.modifyProfile(dto);
  }
}
