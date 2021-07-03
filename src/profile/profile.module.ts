import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './entity/profile.repository';
import { SnsRepository } from './entity/sns.repoistory';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository, SnsRepository])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
