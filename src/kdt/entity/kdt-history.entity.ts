import { User } from 'src/shared/entity/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { KdtType } from './kdt-type.entity';

@Entity('kdt_history')
export class KdtHistory {
  @PrimaryColumn({ type: 'binary', length: 16 })
  order_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ length: 150 })
  payment_key: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.kdt_history)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => KdtType, (kdtType) => kdtType.kdt_history)
  @JoinColumn({ name: 'kdt_type' })
  kdt_type: number;
}
