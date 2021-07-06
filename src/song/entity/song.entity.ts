import { User } from '../../shared/entity/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mood } from './mood/mood.entity';

@Entity('song')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 150 })
  song_url: string;

  @Column({ length: 150 })
  short_url: string;

  @Column({ length: 150 })
  cover_url: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Mood, (mood) => mood.song_id)
  mood: Mood;

  @ManyToOne(() => User, (user) => user.song)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
