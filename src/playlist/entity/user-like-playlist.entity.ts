import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Playlist } from './playlist.entity';
import { User } from 'src/shared/entity/user/user.entity';

@Entity('user_like_playlist')
export class UserLikePlaylist {
  @PrimaryColumn()
  @ManyToOne(() => Playlist, (playlist) => playlist.play_list_has_song)
  @JoinColumn({ name: 'playlist_id' })
  playlist_id: number;

  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.user_like_playlist)
  @JoinColumn({ name: 'user_id' })
  user_id: number;
}
