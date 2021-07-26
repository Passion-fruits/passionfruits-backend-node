import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { ProfileRepository } from './entity/profile.repository';
import { SnsRepository } from './entity/sns.repoistory';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileRepository,
      SnsRepository,
      UserRepository,
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
