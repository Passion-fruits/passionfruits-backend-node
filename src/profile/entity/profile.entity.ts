import { User } from '../../shared/entity/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Sns } from './sns.entity';

@Entity('profile')
export class Profile {
  @PrimaryColumn()
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 250, nullable: true })
  bio: string;

  @Column({ length: 255 })
  image_path: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Sns, (sns) => sns.profile_user_id)
  sns: Sns;
}
