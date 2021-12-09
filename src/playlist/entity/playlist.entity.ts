import { User } from '../../shared/entity/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaylistHasSong } from './playlist-has-song.entity';
import { UserLikePlaylist } from './user-like-playlist.entity';

@Entity('playlist')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 255, nullable: true })
  cover_url: string;

  @Column({ type: 'char', length: 6, nullable: true })
  color_hex: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.playlist)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @OneToMany(
    () => UserLikePlaylist,
    (userLikePlaylist) => userLikePlaylist.playlist_id,
  )
  user_like_playlist: UserLikePlaylist[];

  @OneToMany(
    () => PlaylistHasSong,
    (playlistHasSong) => playlistHasSong.playlist_id,
  )
  play_list_has_song: PlaylistHasSong[];
}
