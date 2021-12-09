import { User } from '../../shared/entity/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mood } from './mood/mood.entity';
import { SongGenre } from './genre/song-genre.entity';
import { UserLikeSong } from '../../shared/entity/like/user-like-song.entity';
import { UserCommentSong } from '../../comment/entity/user-comment-song.entity';
import { PlaylistHasSong } from 'src/playlist/entity/playlist-has-song.entity';
import { History } from 'src/history/entity/history.entity';

@Entity('song')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255 })
  song_url: string;

  @Column({ length: 255 })
  short_url: string;

  @Column({ length: 255 })
  cover_url: string;

  @Column({ type: 'char', length: 6 })
  color_hex: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => SongGenre, (songGenre) => songGenre.song_id)
  song_genre: SongGenre;

  @OneToOne(() => Mood, (mood) => mood.song_id)
  mood: Mood;

  @ManyToOne(() => User, (user) => user.song)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => UserLikeSong, (userLikeSong) => userLikeSong.song_id)
  user_like_song: UserLikeSong[];

  @OneToMany(
    () => UserCommentSong,
    (userCommentSong) => userCommentSong.song_id,
  )
  user_comment_song: UserCommentSong[];

  @OneToMany(
    () => PlaylistHasSong,
    (playlistHasSong) => playlistHasSong.song_id,
  )
  playlist_has_song: PlaylistHasSong[];

  @OneToMany(() => History, (history) => history.song_id)
  history: History[];
}
