import { Song } from 'src/song/entity/song.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('user_like_song')
export class UserLikeSong {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.user_like_song)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Song, (song) => song.user_like_song)
  @JoinColumn({ name: 'song_id' })
  song_id: number;
}
