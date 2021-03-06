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
      .addSelect('profile.bio', 'bio')
      .addSelect('profile.image_path', 'profile')
      .addSelect('sns.insta', 'insta')
      .addSelect('sns.facebook', 'facebook')
      .addSelect('sns.soundcloud', 'soundcloud')
      .addSelect('sns.youtube', 'youtube')
      .addSelect('profile.wallet', 'wallet')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from('song', 'song')
          .where('song.user_id = :user_id', { user_id });
      }, 'song_count')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from('playlist', 'playlist')
          .where('playlist.user_id = :user_id', { user_id });
      }, 'playlist_count')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from('user', 'user')
          .innerJoin('user.follower', 'follower')
          .where('user.id = :user_id', { user_id });
      }, 'follower')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from('user', 'user')
          .innerJoin('user.following', 'following')
          .where('user.id = :user_id', { user_id });
      }, 'following')
      .where('profile.user_id = :user_id', { user_id })
      .groupBy('user.id')
      .getRawOne();
  }

  public async modifyProfile(
    user_id: number,
    dto: ModifyProfileDto,
  ): Promise<void> {
    await this.update(
      { user_id },
      {
        bio: dto.bio,
        name: dto.name,
      },
    );
  }

  public findAccountById(user_id: number): Promise<{ wallet: string }> {
    return this.findOne({
      select: ['wallet'],
      where: { user_id },
    });
  }
}
