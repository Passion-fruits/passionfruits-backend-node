import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../../shared/entity/user/user.entity';

@Entity('kdt')
export class Kdt {
  @PrimaryColumn()
  @OneToOne(() => User, (user) => user.kdt)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'bigint', default: 0 })
  add_kdt: number;

  @Column({ type: 'bigint', default: 0 })
  donate_kdt: number;
}
