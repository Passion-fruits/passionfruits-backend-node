import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Song } from '../song.entity';
import { MoodType } from './mood-type.entity';

@Entity('mood')
export class Mood {
  @PrimaryColumn()
  @OneToOne(() => Song, (song) => song.mood)
  @JoinColumn({ name: 'song_id' })
  song_id: number;

  @ManyToOne(() => MoodType, (moodType) => moodType.mood)
  @JoinColumn({ name: 'mood_type_id' })
  mood_type: number;
}
