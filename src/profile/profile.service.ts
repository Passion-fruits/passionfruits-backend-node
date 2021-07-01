import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetProfileResponseData } from './dto/get-profile.dto';
import { Profile } from './entity/profile.entity';
import { ProfileRepository } from './entity/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async getProfile(user_id: number): Promise<GetProfileResponseData> {
    const profileRecord = await this.profileRepository.getProfile(user_id);
    if (!profileRecord) throw new NotFoundException();
    return profileRecord;
  }
}
