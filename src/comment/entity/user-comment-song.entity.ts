import { User } from 'src/shared/entity/user/user.entity';
import { Song } from 'src/song/entity/song.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('user_comment_song')
export class UserCommentSong {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.user_comment_song)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Song, (song) => song.user_comment_song)
  @JoinColumn({ name: 'song_id' })
  song_id: number;

  @Column({ length: 200 })
  comment: string;
}
