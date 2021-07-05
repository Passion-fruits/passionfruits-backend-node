import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mood } from './mood.entity';

@Entity('mood_type')
export class MoodType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @OneToMany(() => Mood, (mood) => mood.mood_type)
  mood: Mood[];
}
