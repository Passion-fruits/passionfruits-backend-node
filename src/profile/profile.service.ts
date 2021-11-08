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
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from 'src/shared/jwt/jwt.constant';
import { IJwtPayload } from 'src/shared/jwt/interface/payload.interface';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';

@Injectable({ scope: Scope.REQUEST })
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
    @InjectRepository(Sns)
    private readonly snsRepository: SnsRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public async getProfile(
    user_id: number,
    token: string,
  ): Promise<GetProfileResponseData> {
    const profileRecord = await this.profileRepository.getProfile(user_id);
    if (!profileRecord) throw NotFoundProfileException;
    const is_mine = await this.verifyUser(user_id, token);
    return { ...profileRecord, is_mine };
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
    else await this.snsRepository.modifySns(this.request.user.sub, dto);

    await this.profileRepository.modifyProfile(this.request.user.sub, dto);
    return { ...dto };
  }

  public async modifyProfileImage(image_path: string): Promise<void> {
    const profileRecord = await this.profileRepository.findOne(
      this.request.user.sub,
    );
    if (!profileRecord) throw NotFoundProfileException;
    await this.profileRepository.update(
      { user_id: this.request.user.sub },
      { image_path },
    );
  }

  public async postWallet(wallet: string): Promise<void> {
    const profileRecord = await this.profileRepository.findOne(
      this.request.user.sub,
    );
    if (!profileRecord) throw NotFoundProfileException;
    await this.profileRepository.update(this.request.user.sub, { wallet });
  }

  private async verifyUser(user_id: number, token: string): Promise<boolean> {
    try {
      if (!token) return false;
      const splitToken = token.split(' ');
      if (splitToken[0] !== 'Bearer') return false;
      const payload: IJwtPayload | any = jwt.verify(
        splitToken[1],
        JWT_SECRET_KEY,
      );
      if (payload.type !== 'access') return false;
      const userRecord = await this.userRepository.findOne(user_id);
      if (!userRecord) return false;
      if (user_id !== payload.sub) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
}
