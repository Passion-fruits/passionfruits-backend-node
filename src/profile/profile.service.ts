import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserReqeust } from '../shared/interface/request.interface';
import { GetProfileResponseData } from './dto/get-profile.dto';
import {
  ModifyProfileResponseData,
  ModifyProfileDto,
} from './dto/modify-profile.dto';
import { Profile } from './entity/profile.entity';
import { ProfileRepository } from './entity/profile.repository';
import { NotFoundProfileException } from '../shared/exception/exception.index';
import { Sns } from './entity/sns.entity';
import { SnsRepository } from './entity/sns.repoistory';

@Injectable({ scope: Scope.REQUEST })
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
    @InjectRepository(Sns)
    private readonly snsRepository: SnsRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public async getProfile(user_id: number): Promise<GetProfileResponseData> {
    const profileRecord = await this.profileRepository.getProfile(user_id);
    const snsRecord = await this.snsRepository.findOne(user_id);
    if (!profileRecord) throw NotFoundProfileException;
    const { insta, facebook, soundcloud, youtube, ...profileResult } =
      profileRecord;

    if (!snsRecord) {
      return {
        ...profileResult,
        insta: '',
        facebook: '',
        soundcloud: '',
        youtube: '',
      };
    } else {
      const { profile_user_id, ...snsResult } = snsRecord;
      return {
        ...profileRecord,
        ...snsResult,
      };
    }
  }

  public async modifyProfile(
    dto: ModifyProfileDto,
  ): Promise<ModifyProfileResponseData> {
    const profileRecord = await this.profileRepository.findOne(
      this.request.user.sub,
    );
    const snsRecord = await this.snsRepository.findOne(this.request.user.sub);
    if (!profileRecord) throw NotFoundProfileException;

    if (!snsRecord)
      await this.snsRepository.createSns(profileRecord.user_id, dto);
    else await this.snsRepository.modifySns(snsRecord, dto);

    await this.profileRepository.modifyProfile(profileRecord, dto);
    return { ...dto };
  }

  public async modifyProfileImage(image_path: string): Promise<void> {
    const profileRecord = await this.profileRepository.findOne(
      this.request.user.sub,
    );
    if (!profileRecord) throw NotFoundProfileException;
    await this.profileRepository.update(profileRecord, { image_path });
  }
}
