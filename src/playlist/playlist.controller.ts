import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddSongInPlaylistDto } from './dto/add-song-in-playlist.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { DeleteSongInPlaylistDto } from './dto/delete-song-in-playlist.dto';
import { GetPlaylistResponseData } from './dto/get-playlist.dto';
import { PlaylistService } from './playlist.service';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public createPlaylist(@Body() dto: CreatePlaylistDto): void {
    this.playlistService.createPlaylist(dto);
  }

  @Get(':playlist_id')
  public async getPlaylist(
    @Param('playlist_id') playlist_id: number,
  ): Promise<GetPlaylistResponseData> {
    return await this.playlistService.getPlaylist(playlist_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post(':playlist_id')
  public async addSongInPlaylist(
    @Param('playlist_id') playlist_id: number,
    @Body() dto: AddSongInPlaylistDto,
  ): Promise<void> {
    await this.playlistService.addSongInPlaylist(dto, playlist_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':playlist_id')
  public async deleteSongInPlaylist(
    @Param('playlist_id') playlist_id: number,
    @Body() dto: DeleteSongInPlaylistDto,
  ): Promise<void> {
    await this.playlistService.deleteSongInPlaylist(dto, playlist_id);
  }
}
