import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../shared/entity/user/user.entity';
import { UserRepository } from '../shared/entity/user/user.repository';
import { IUserReqeust } from '../shared/interface/request.interface';
import { UploadSongDto } from './dto/upload-song.dto';
import { Song } from './entity/song.entity';
import { SongRepository } from './entity/song.repository';
import { s3 } from '../config/multer';
import { createReadStream, unlinkSync } from 'fs';
import { Mood } from './entity/mood/mood.entity';
import { MoodRepository } from './entity/mood/mood.repository';
import { SongGenre } from './entity/genre/song-genre.entity';
import { SongGenreRepository } from './entity/genre/song-genre.repository';
import { GetMySongsResponseData } from './dto/get-my-songs.dto';
import { NotFoundSongException } from 'src/shared/exception/exception.index';
import { GetSongResponseData } from './dto/get-song.dto';
import { SongView } from './entity/song-view/song-view.entity';
import { SongViewRepository } from './entity/song-view/song-view.repository';

@Injectable({ scope: Scope.REQUEST })
export class SongService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: SongRepository,
    @InjectRepository(SongView)
    private readonly songViewRepository: SongViewRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Mood) private readonly moodRepository: MoodRepository,
    @InjectRepository(SongGenre)
    private readonly songGenreRepository: SongGenreRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public async getSong(id: number): Promise<GetSongResponseData> {
    const songRecord = await this.songViewRepository.getSong(id);
    if (!songRecord) throw NotFoundSongException;
    return songRecord;
  }

  public async getMySongs(): Promise<GetMySongsResponseData[]> {
    const songRecords = await this.songViewRepository.getMySongs(
      this.request.user.sub,
    );
    if (songRecords.length === 0) throw NotFoundSongException;
    return songRecords;
  }

  public async uploadSong(
    song_url: string,
    cover_url: string,
    dto: UploadSongDto,
  ): Promise<void> {
    const MP3Cutter = require('mp3-cutter');
    const filepath = `${process.cwd()}/upload/`;
    const userRecord = await this.userRepository.findOne(this.request.user.sub);
    const songRecord = await this.songRepository.createSong(
      song_url,
      cover_url,
      dto,
      userRecord,
    );
    await this.moodRepository.createMood(songRecord.id, dto.mood);
    await this.songGenreRepository.createSongGenre(songRecord.id, dto.genre);

    // 음악 자르기
    MP3Cutter.cut({
      src: `${filepath}song/${song_url}`,
      target: `${filepath}/short/${song_url}`,
      start: Math.floor(dto.duration / 3),
      end: Math.floor(dto.duration / 3 + 15),
    });

    await this.uploadS3(song_url, 'short', 'short');
    await this.uploadS3(song_url, 'song', 'song');
    await this.uploadS3(cover_url, 'song', 'cover');
  }

  private async uploadS3(
    filename: string,
    folder: string,
    s3folder: string,
  ): Promise<void> {
    await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${s3folder}/${filename}`,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
        Body: createReadStream(`${process.cwd()}/upload/${folder}/${filename}`),
      })
      .promise();

    unlinkSync(`${process.cwd()}/upload/${folder}/${filename}`);
  }
}
