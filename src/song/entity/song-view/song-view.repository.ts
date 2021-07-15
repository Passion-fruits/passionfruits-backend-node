import { GetMySongsResponseData } from '../../../song/dto/get-my-songs.dto';
import { GetSongResponseData } from '../../../song/dto/get-song.dto';
import { EntityRepository, Repository } from 'typeorm';
import { SongView } from './song-view.entity';

@EntityRepository(SongView)
export class SongViewRepository extends Repository<SongView> {
  public async getMySongs(user_id: number): Promise<GetMySongsResponseData[]> {
    return this.createQueryBuilder('view')
      .select('view.song_id', 'song_id')
      .addSelect('view.title', 'title')
      .addSelect('view.description', 'description')
      .addSelect('view.cover_url', 'cover_url')
      .addSelect('view.song_url', 'song_url')
      .addSelect('view.created_at', 'created_at')
      .addSelect('view.genre', 'genre')
      .addSelect('view.artist', 'artist')
      .addSelect('view.like', 'like')
      .addSelect('view.comment', 'comment')
      .where('view.user_id = :user_id', { user_id })
      .getRawMany();
  }

  public async getSong(song_id: number): Promise<GetSongResponseData> {
    return this.createQueryBuilder('view')
      .select('view.song_id', 'song_id')
      .addSelect('view.user_id', 'user_id')
      .addSelect('view.cover_url', 'cover_url')
      .addSelect('view.song_url', 'song_url')
      .addSelect('view.title', 'title')
      .addSelect('view.description', 'description')
      .addSelect('view.created_at', 'created_at')
      .addSelect('view.genre', 'genre')
      .addSelect('view.mood', 'mood')
      .addSelect('view.artist', 'artist')
      .addSelect('view.like', 'like')
      .addSelect('view.comment', 'comment')
      .where('view.song_id = :song_id', { song_id })
      .getRawOne();
  }

  public async getSongsByGenre(
    genre: number,
  ): Promise<GetMySongsResponseData[]> {
    return this.createQueryBuilder('view')
      .select('view.song_id', 'song_id')
      .addSelect('view.title', 'title')
      .addSelect('view.description', 'description')
      .addSelect('view.cover_url', 'cover_url')
      .addSelect('view.song_url', 'song_url')
      .addSelect('view.created_at', 'created_at')
      .addSelect('view.genre', 'genre')
      .addSelect('view.artist', 'artist')
      .addSelect('view.like', 'like')
      .addSelect('view.comment', 'comment')
      .where('view.genre_number = :genre', { genre })
      .getRawMany();
  }
}
