import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { GetProfileResponseData } from '../dto/get-profile.dto';
import { ModifyProfileDto } from '../dto/modify-profile.dto';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async getProfile(user_id: number): Promise<GetProfileResponseData> {
    return await this.createQueryBuilder('profile')
      .innerJoin('profile.user_id', 'user')
      .innerJoin('profile.sns', 'sns')
      .select('user.email', 'email')
      .addSelect('profile.name', 'name')
      .addSelect('profile.image_path', 'profile')
      .addSelect('sns.insta', 'insta')
      .addSelect('sns.facebook', 'facebook')
      .addSelect('sns.soundcloud', 'soundcloud')
      .addSelect('sns.youtube', 'youtube')
      .where('profile.user_id = :user_id', { user_id })
      .getRawOne();
  }

  public async modifyProfile(
    profile: Profile,
    dto: ModifyProfileDto,
  ): Promise<UpdateResult> {
    return await this.update(profile, {
      bio: dto.bio,
      name: dto.name,
    });
  }
}
