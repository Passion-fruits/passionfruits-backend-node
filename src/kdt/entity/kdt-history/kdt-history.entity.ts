import { User } from 'src/shared/entity/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { KdtType } from '../kdt-type/kdt-type.entity';
import { Message } from '../message/message.entity';

@Entity('kdt_history')
export class KdtHistory {
  @PrimaryColumn({ type: 'char', length: 36 })
  order_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ length: 150, nullable: true })
  payment_key: string;

  @Column()
  amount: number;

  @Column({ length: 150 })
  tx_hash: string;

  @ManyToOne(() => Message, (message) => message.kdt_history, {
    nullable: true,
  })
  @JoinColumn({ name: 'message_id' })
  message_id: number;

  @ManyToOne(() => User, (user) => user.kdt_history)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => KdtType, (kdtType) => kdtType.kdt_history)
  @JoinColumn({ name: 'kdt_type' })
  kdt_type: number;
}
