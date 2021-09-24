import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistHasSongRepository } from './entity/playlist-has-song.repository';
import { PlaylistRepository } from './entity/playlist.repository';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistRepository, PlaylistHasSongRepository]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
