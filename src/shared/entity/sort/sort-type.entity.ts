import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Entity('sort_type')
export class SortType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ type: 'enum', enum: Order })
  order: Order;
}
