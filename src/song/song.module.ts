import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../shared/entity/user/user.repository';
import { SongGenreRepository } from './entity/genre/song-genre.repository';
import { MoodRepository } from './entity/mood/mood.repository';
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
    ]),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
