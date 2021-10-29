import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KdtHistoryRepository } from './entity/kdt-history.repository';
import { KdtRepository } from './entity/kdt.repository';
import { KdtController } from './kdt.controller';
import { KdtService } from './kdt.service';

@Module({
  imports: [TypeOrmModule.forFeature([KdtRepository, KdtHistoryRepository])],
  controllers: [KdtController],
  providers: [KdtService],
})
export class KdtModule {}
