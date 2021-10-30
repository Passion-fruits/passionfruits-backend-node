import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongRepository } from 'src/song/entity/song.repository';
import { HistoryViewRepository } from './entity/history-view/history-view.repository';
import { HistoryRepository } from './entity/history.repository';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HistoryRepository,
      SongRepository,
      HistoryViewRepository,
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
