import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './entity/profile.repository';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
