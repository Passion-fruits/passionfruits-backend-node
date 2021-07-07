import {
  Body,
  Controller,
  Get,
  Post,
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getMySongs(): Promise<GetMySongsResponseData[]> {
    return await this.songService.getMySongs();
  }
}
