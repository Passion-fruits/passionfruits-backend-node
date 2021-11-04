import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { KdtHistory } from '../kdt-history/kdt-history.entity';

@Entity('kdt_type')
export class KdtType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  type: string;

  @OneToMany(() => KdtHistory, (kdtHistory) => kdtHistory.kdt_type)
  kdt_history: KdtHistory[];
}
