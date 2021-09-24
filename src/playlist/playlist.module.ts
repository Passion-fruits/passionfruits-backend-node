import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistRepository } from './entity/playlist.repository';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistRepository])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
