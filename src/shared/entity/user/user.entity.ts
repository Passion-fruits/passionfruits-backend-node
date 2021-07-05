import { Profile } from '../../../profile/entity/profile.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from '../../../song/entity/song.entity';

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
}
