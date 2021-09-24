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

@Entity('playlist')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 255, nullable: true })
  cover_url: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.playlist)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @OneToMany(
    () => PlaylistHasSong,
    (playlistHasSong) => playlistHasSong.playlist_id,
  )
  playlistHasSong: PlaylistHasSong[];
}
