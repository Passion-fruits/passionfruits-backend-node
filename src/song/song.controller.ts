import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
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
import { GetRecentSongResponseData } from './dto/get-recent-song.dto';
import { GetPopularSongResponseData } from './dto/get-popular-songs.dto';

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
    @Query('size') size: number,
  ): Promise<GetStreamResponseData> {
    return await this.songService.getStream(genre, page, sort, size);
  }

  @Get('feed')
  public async getFeed(
    @Query('genre') genre: number,
    @Query('page') page: number,
    @Query('sort') sort: number,
  ): Promise<GetMySongsResponseData[]> {
    return await this.songService.getFeed(genre, page, sort);
  }

  @Get('recent')
  public getRecentSongs(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<GetRecentSongResponseData> {
    return this.songService.getRecentSong(page, size);
  }

  @Get('popular')
  public getPopularSongs(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<GetPopularSongResponseData> {
    return this.songService.getPopularSong(page, size);
  }

  @Get(':song_id')
  public async getSong(
    @Param('song_id') id: number,
  ): Promise<GetSongResponseData> {
    return await this.songService.getSong(id);
  }

  @Patch('view/:song_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public viewSong(
    @Param('song_id') id: number,
    @Headers('x-forwarded-for') ip: string,
  ): void {
    this.songService.viewSong(id, ip);
  }
}
