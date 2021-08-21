import { User } from '../../shared/entity/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UploadSongDto } from '../dto/upload-song.dto';
import { Song } from './song.entity';

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {
  public async createSong(
    song_url: string,
    cover_url: string,
    dto: UploadSongDto,
    user: User,
  ): Promise<Song> {
    let newSong: Song;
    newSong = this.create({
      title: dto.title,
      description: dto.description,
      song_url: `${process.env.AWS_S3_URL}/song/${song_url}`,
      short_url: `${process.env.AWS_S3_URL}/short/${song_url}`,
      cover_url: `${process.env.AWS_S3_URL}/cover/${cover_url}`,
      user,
    });
    return await this.save(newSong);
  }

  public async getCountsByUserId(user_id: number): Promise<number> {
    return await this.createQueryBuilder('song')
      .where('song.user_id = :user_id', { user_id })
      .getCount();
  }
}
