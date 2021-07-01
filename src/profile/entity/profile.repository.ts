import { EntityRepository, Repository } from 'typeorm';
import { GetProfileResponseData } from '../dto/get-profile.dto';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async getProfile(user_id: number): Promise<GetProfileResponseData> {
    return await this.createQueryBuilder('profile')
      .innerJoin('profile.user_id', 'user')
      .select('user.email')
      .addSelect('profile.name', 'name')
      .addSelect('profile.image_path', 'profile')
      .where('profile.user_id = :user_id', { user_id })
      .getRawOne();
  }
}
