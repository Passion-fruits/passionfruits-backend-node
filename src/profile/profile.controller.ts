import { Controller, Get, Param } from '@nestjs/common';
import { GetProfileResponseData } from './dto/get-profile.dto';
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
}
