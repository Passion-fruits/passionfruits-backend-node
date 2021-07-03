import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('sns')
export class Sns {
  @PrimaryColumn()
  @OneToOne(() => Profile, (profile) => profile.sns)
  @JoinColumn({ name: 'profile_user_id' })
  profile_user_id: number;

  @Column({ length: 150, nullable: true })
  insta: string;

  @Column({ length: 150, nullable: true })
  facebook: string;

  @Column({ length: 150, nullable: true })
  soundcloud: string;

  @Column({ length: 150, nullable: true })
  youtube: string;
}
