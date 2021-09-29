import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongViewRepository } from 'src/song/entity/song-view/song-view.repository';
import { SongRepository } from 'src/song/entity/song.repository';
import { PlaylistHasSongRepository } from './entity/playlist-has-song.repository';
import { PlaylistRepository } from './entity/playlist.repository';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlaylistRepository,
      PlaylistHasSongRepository,
      SongViewRepository,
      SongRepository,
    ]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
