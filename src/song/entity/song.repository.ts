import { User } from '../../shared/entity/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UploadSongDto } from '../dto/upload-song.dto';
import { Song } from './song.entity';
import { GetMySongsResponseData } from '../dto/get-my-songs.dto';
import { GetSongResponseData } from '../dto/get-song.dto';

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

  public async getMySongs(user_id: number): Promise<GetMySongsResponseData[]> {
    return await this.createQueryBuilder('song')
      .innerJoin('song.song_genre', 'song_genre')
      .innerJoin('song.user', 'user')
      .leftJoin('song.user_like_song', 'user_like_song')
      .leftJoin('song.user_comment_song', 'user_comment_song')
      .innerJoin('user.profile', 'profile')
      .innerJoin('song_genre.genre_type', 'genre_type')
      .select('song.id', 'id')
      .addSelect('song.title', 'title')
      .addSelect('song.description', 'description')
      .addSelect('song.cover_url', 'cover_url')
      .addSelect('song.song_url', 'song_url')
      .addSelect('song.created_at', 'created_at')
      .addSelect('genre_type.name', 'genre')
      .addSelect('profile.name', 'artist')
      .addSelect(
        'COUNT(distinct user_like_song.song_id, user_like_song.user_id)',
        'like',
      )
      .addSelect(
        'COUNT(distinct user_comment_song.song_id, user_comment_song.user_id)',
        'comment',
      )
      .groupBy('song.id')
      .orderBy('song.id', 'ASC')
      .where('song.user_id = :user_id', { user_id })
      .getRawMany();
  }

  public async getSong(song_id: number): Promise<GetSongResponseData | any> {
    return await this.createQueryBuilder('song')
      .innerJoin('song.user', 'user')
      .innerJoin('song.song_genre', 'song_genre')
      .innerJoin('song_genre.genre_type', 'genre_type')
      .innerJoin('user.profile', 'profile')
      .innerJoin('song.mood', 'mood')
      .innerJoin('mood.mood_type', 'mood_type')
      .leftJoin('song.user_like_song', 'user_like_song')
      .select('song.id', 'song_id')
      .addSelect('user.id', 'user_id')
      .addSelect('song.cover_url', 'cover_url')
      .addSelect('song.song_url', 'song_url')
      .addSelect('song.title', 'title')
      .addSelect('song.description', 'description')
      .addSelect('song.created_at', 'created_at')
      .addSelect('genre_type.name', 'genre')
      .addSelect('mood_type.name', 'mood')
      .addSelect('profile.name', 'artist')
      .addSelect(
        'COUNT(distinct user_like_song.song_id, user_like_song.user_id)',
        'like',
      )
      .groupBy('song.id')
      .orderBy('song.id', 'ASC')
      .where('song.id = :song_id', { song_id })
      .getRawOne();
  }
}
