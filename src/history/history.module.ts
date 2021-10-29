import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongRepository } from 'src/song/entity/song.repository';
import { HistoryRepository } from './entity/history.repository';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository, SongRepository])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
