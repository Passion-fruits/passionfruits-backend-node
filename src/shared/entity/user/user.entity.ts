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
    () => UserCommentSong,
    (userCommentSong) => userCommentSong.user_id,
  )
  user_comment_song: UserCommentSong[];
}
