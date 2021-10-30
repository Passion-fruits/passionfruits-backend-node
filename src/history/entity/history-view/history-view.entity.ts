import { Connection, ViewColumn, ViewEntity } from 'typeorm';
import { History } from '../history.entity';

@ViewEntity({
  name: 'history_view',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder(History, 'history')
      .innerJoin('history.user_id', 'user')
      .innerJoin('history.song_id', 'song')
      .innerJoin('user.profile', 'profile')
      .select('song.id', 'song_id')
      .addSelect('user.id', 'user_id')
      .addSelect('song.cover_url', 'cover_url')
      .addSelect('song.song_url', 'song_url')
      .addSelect('song.title', 'title')
      .addSelect('history.created_at', 'created_at')
      .addSelect('profile.name', 'artist'),
})
export class HistoryView {
  @ViewColumn()
  song_id: number;

  @ViewColumn()
  user_id: number;

  @ViewColumn()
  cover_url: string;

  @ViewColumn()
  song_url: string;

  @ViewColumn()
  title: string;

  @ViewColumn()
  created_at: Date;

  @ViewColumn()
  artist: string;
}
