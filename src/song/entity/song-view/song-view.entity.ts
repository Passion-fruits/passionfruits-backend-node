import { Connection, ViewColumn, ViewEntity } from 'typeorm';
import { Song } from '../song.entity';

@ViewEntity({
  name: 'song_view',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder(Song, 'song')
      .innerJoin('song.user', 'user')
      .innerJoin('song.song_genre', 'song_genre')
      .innerJoin('song_genre.genre_type', 'genre_type')
      .innerJoin('user.profile', 'profile')
      .innerJoin('song.mood', 'mood')
      .innerJoin('mood.mood_type', 'mood_type')
      .leftJoin('song.user_comment_song', 'user_comment_song')
      .leftJoin('song.playlist_has_song', 'playlist_has_song')
      .leftJoin('song.user_like_song', 'user_like_song')
      .select('song.id', 'song_id')
      .addSelect('user.id', 'user_id')
      .addSelect('song.cover_url', 'cover_url')
      .addSelect('song.song_url', 'song_url')
      .addSelect('song.short_url', 'short_url')
      .addSelect('song.title', 'title')
      .addSelect('song.description', 'description')
      .addSelect('song.created_at', 'created_at')
      .addSelect('song_genre.genre_type', 'genre_number')
      .addSelect('genre_type.name', 'genre')
      .addSelect('mood_type.name', 'mood')
      .addSelect('profile.name', 'artist')
      .addSelect('playlist_has_song.playlist_id', 'playlist_has_song_id')
      .addSelect(
        'COUNT(distinct user_like_song.song_id, user_like_song.user_id)',
        'like',
      )
      .addSelect(
        'COUNT(distinct user_comment_song.song_id, user_comment_song.user_id)',
        'comment',
      )
      .groupBy('song.id')
      .addGroupBy('playlist_has_song.playlist_id')
      .orderBy('song.id', 'ASC'),
})
export class SongView {
  @ViewColumn()
  song_id: number;

  @ViewColumn()
  user_id: number;

  @ViewColumn()
  cover_url: string;

  @ViewColumn()
  song_url: string;

  @ViewColumn()
  short_url: string;

  @ViewColumn()
  title: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  created_at: Date;

  @ViewColumn()
  genre: string;

  @ViewColumn()
  genre_number: number;

  @ViewColumn()
  mood: string;

  @ViewColumn()
  artist: string;

  @ViewColumn()
  playlist_has_song_id: number;

  @ViewColumn()
  like: number;

  @ViewColumn()
  comment: number;
}
