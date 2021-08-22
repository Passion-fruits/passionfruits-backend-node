import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('follow')
export class Follow {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.follower)
  @JoinColumn({ name: 'follower' })
  follower: number;

  @PrimaryColumn()
  @ManyToOne(() => User, (song) => song.following)
  @JoinColumn({ name: 'following' })
  following: number;
}
