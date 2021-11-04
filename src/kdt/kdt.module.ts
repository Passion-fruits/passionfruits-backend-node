import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from 'src/profile/entity/profile.repository';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { KdtHistoryRepository } from './entity/kdt-history/kdt-history.repository';
import { KdtRepository } from './entity/kdt/kdt.repository';
import { MessageRepository } from './entity/message/message.repository';
import { KdtController } from './kdt.controller';
import { KdtService } from './kdt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KdtRepository,
      KdtHistoryRepository,
      ProfileRepository,
      UserRepository,
      MessageRepository,
    ]),
  ],
  controllers: [KdtController],
  providers: [KdtService],
})
export class KdtModule {}
