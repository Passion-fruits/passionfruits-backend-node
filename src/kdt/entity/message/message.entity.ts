import { User } from 'src/shared/entity/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { KdtHistory } from '../kdt-history/kdt-history.entity';

@Entity('message')
export class Message {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @ManyToOne(() => User, (user) => user.message)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToOne(() => KdtHistory, (kdtHistory) => kdtHistory.message_id)
  kdt_history: KdtHistory;
}
