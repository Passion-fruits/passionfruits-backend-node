import { User } from 'src/shared/entity/user/user.entity';
import { Song } from 'src/song/entity/song.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('history')
export class History {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.history)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Song, (song) => song.history)
  @JoinColumn({ name: 'song_id' })
  song_id: number;

  @CreateDateColumn()
  created_at: Date;
}
