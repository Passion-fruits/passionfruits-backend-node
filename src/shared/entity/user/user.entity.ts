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

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user_id)
  profile: Profile;

  @OneToMany(() => Song, (song) => song.user)
  song: Song[];

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

  @OneToMany(() => Follow, (follow) => follow.following)
  following: Follow[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlist: Playlist[];
}
