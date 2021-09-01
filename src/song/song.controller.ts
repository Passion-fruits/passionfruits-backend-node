import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IMulterFile } from '../shared/interface/request.interface';
import { SongMulterConfigs } from '../config/multer';
import { UploadSongDto, UploadSongResponseData } from './dto/upload-song.dto';
import { SongService } from './song.service';
import { GetMySongsResponseData } from './dto/get-my-songs.dto';
import { GetSongResponseData } from './dto/get-song.dto';
import { GetSongsByUserIdResponseData } from './dto/get-songs-by-user-id.dto';
import { GetStreamResponseData } from './dto/get-stream.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('song', 2, SongMulterConfigs))
  @Post()
  public async uploadSong(
    @UploadedFiles() files: Array<IMulterFile>,
    @Body() dto: UploadSongDto,
  ): Promise<UploadSongResponseData> {
    await this.songService.uploadSong(
      files[0].filename,
      files[1].filename,
      dto,
    );
    return { message: 'success' };
  }

  @Get('profile/:user_id')
  public async getSongsByUserId(
    @Param('user_id') user_id: number,
    @Query('page') page: number,
  ): Promise<GetSongsByUserIdResponseData> {
    return await this.songService.getSongsByUserId(user_id, page);
  }

  @Get('stream')
  public async getStream(
    @Query('genre') genre: number,
    @Query('page') page: number,
    @Query('sort') sort: number,
  ): Promise<GetStreamResponseData> {
    return await this.songService.getStream(genre, page, sort);
  }

  @Get('feed')
  public async getFeed(
    @Query('genre') genre: number,
    @Query('page') page: number,
    @Query('sort') sort: number,
  ): Promise<GetMySongsResponseData[]> {
    return await this.songService.getFeed(genre, page, sort);
  }

  @Get(':song_id')
  public async getSong(
    @Param('song_id') id: number,
  ): Promise<GetSongResponseData> {
    return await this.songService.getSong(id);
  }
}
