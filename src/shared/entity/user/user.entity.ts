import { Profile } from '../../../profile/entity/profile.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from '../../../song/entity/song.entity';
import { UserLikeSong } from '../like/user-like-song.entity';
import { UserCommentSong } from '../../../comment/entity/user-comment-song.entity';
import { Follow } from '../follow/follow.entity';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { UserLikePlaylist } from 'src/playlist/entity/user-like-playlist.entity';
import { Kdt } from '../../../kdt/entity/kdt/kdt.entity';
import { KdtHistory } from 'src/kdt/entity/kdt-history/kdt-history.entity';
import { History } from 'src/history/entity/history.entity';
import { Message } from 'src/kdt/entity/message/message.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  private_key: string;

  @OneToOne(() => Profile, (profile) => profile.user_id)
  profile: Profile;

  @OneToOne(() => Kdt, (kdt) => kdt.user_id)
  kdt: Kdt;

  @OneToMany(() => Message, (message) => message.user_id)
  user_message: Message[];

  @OneToMany(() => Message, (message) => message.artist_id)
  artist_message: Message[];

  @OneToMany(() => Song, (song) => song.user)
  song: Song[];

  @OneToMany(() => KdtHistory, (kdtHistory) => kdtHistory.user)
  kdt_history: KdtHistory[];

  @OneToMany(() => UserLikeSong, (userLikeSong) => userLikeSong.user_id)
  user_like_song: UserLikeSong[];

  @OneToMany(
    () => UserLikePlaylist,
    (userLikePlaylist) => userLikePlaylist.user_id,
  )
  user_like_playlist: UserLikePlaylist;

  @OneToMany(
    () => UserCommentSong,
    (userCommentSong) => userCommentSong.user_id,
  )
  user_comment_song: UserCommentSong[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  follower: Follow[];

  @OneToMany(() => History, (history) => history.user_id)
  history: History[];

  @OneToMany(() => Follow, (follow) => follow.following)
  following: Follow[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlist: Playlist[];
}
