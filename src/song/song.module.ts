import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortTypeRepository } from 'src/shared/entity/sort/sort-type.repository';
import { UserRepository } from '../shared/entity/user/user.repository';
import { SongGenreRepository } from './entity/genre/song-genre.repository';
import { MoodRepository } from './entity/mood/mood.repository';
import { SongViewRepository } from './entity/song-view/song-view.repository';
import { SongRepository } from './entity/song.repository';
import { SongController } from './song.controller';
import { SongService } from './song.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SongRepository,
      UserRepository,
      MoodRepository,
      SongGenreRepository,
      SongViewRepository,
      SortTypeRepository,
    ]),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
