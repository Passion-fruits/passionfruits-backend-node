import { Profile } from '../../../profile/entity/profile.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user_id)
  profile: Profile;
}
