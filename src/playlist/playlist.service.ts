import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { getAverageColor } from 'fast-average-color-node';
import { s3 } from 'src/config/multer';
import {
  NotFoundPlaylistException,
  NotFoundPlaylistHasSongException,
  NotFoundSongException,
  PlaylistHasSongExistException,
  QueryBadRequest,
  S3GetObjectException,
} from 'src/shared/exception/exception.index';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { SongViewRepository } from 'src/song/entity/song-view/song-view.repository';
import { SongRepository } from 'src/song/entity/song.repository';
import { AddSongInPlaylistDto } from './dto/add-song-in-playlist.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { DeleteSongInPlaylistDto } from './dto/delete-song-in-playlist.dto';
import {
  GetPlaylistResponseData,
  PlaylistVo,
  SongVo,
} from './dto/get-playlist.dto';
import { GetPopularPlaylistResponseData } from './dto/get-popular-playlist.dto';
import { GetRandomPlaylistResponseData } from './dto/get-random-playlist.dto';
import { GetUserPlaylistResponseData } from './dto/get-user-playlist.dto';
import { PlaylistHasSongRepository } from './entity/playlist-has-song.repository';
import { PlaylistRepository } from './entity/playlist.repository';

@Injectable({ scope: Scope.REQUEST })
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistRepository)
    private readonly playlistRepository: PlaylistRepository,
    @InjectRepository(PlaylistHasSongRepository)
    private readonly playlistHasSongRepository: PlaylistHasSongRepository,
    @InjectRepository(SongViewRepository)
    private readonly songViewRepository: SongViewRepository,
    @InjectRepository(SongRepository)
    private readonly songRepository: SongRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public createPlaylist(dto: CreatePlaylistDto): void {
    this.playlistRepository.createPlaylist(dto, this.request.user.sub);
  }

  public async getPlaylist(
    playlist_id: number,
  ): Promise<GetPlaylistResponseData> {
    const playlistRecord: PlaylistVo =
      await this.playlistRepository.getPlaylist(playlist_id);
    if (!playlistRecord) throw NotFoundPlaylistException;
    const songRecords: SongVo[] =
      await this.songViewRepository.getSongsByPlaylistId(playlist_id);

    return {
      playlist: playlistRecord,
      songs: songRecords,
    };
  }

  public async addSongInPlaylist(
    dto: AddSongInPlaylistDto,
    playlist_id: number,
  ): Promise<void> {
    const playlistRecord = await this.playlistRepository.findMyPlaylist(
      playlist_id,
      this.request.user.sub,
    );
    if (!playlistRecord) throw NotFoundPlaylistException;
    const playlistHasSongRecord = await this.playlistHasSongRepository.findOne({
      song_id: dto.song_id,
      playlist_id,
    });
    if (playlistHasSongRecord) throw PlaylistHasSongExistException;
    const songRecord = await this.songRepository.findOne(dto.song_id);
    if (!songRecord) throw NotFoundSongException;

    if (
      (await this.playlistHasSongRepository.count({
        where: { playlist_id },
      })) === 0
    ) {
      s3.getObject(
        {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: songRecord.cover_url.replace(`${process.env.AWS_S3_URL}/`, ''),
        },
        async (err, data) => {
          if (err) throw S3GetObjectException;
          const { hex } = await getAverageColor(data.Body as Buffer);
          await this.playlistRepository.update(
            { id: playlist_id },
            {
              cover_url: songRecord.cover_url,
              color_hex: hex.replace('#', ''),
            },
          );
        },
      );
    }

    await this.playlistHasSongRepository.addSongInPlaylist(dto, playlist_id);
  }

  public async deleteSongInPlaylist(
    dto: DeleteSongInPlaylistDto,
    playlist_id: number,
  ): Promise<void> {
    const playlistRecord = await this.playlistRepository.findOne({
      id: playlist_id,
      user: this.request.user.sub,
    });
    if (!playlistRecord) throw NotFoundPlaylistException;
    const playlistHasSongRecord = await this.playlistHasSongRepository.findOne({
      song_id: dto.song_id,
      playlist_id,
    });
    if (!playlistHasSongRecord) throw NotFoundPlaylistHasSongException;

    await this.playlistHasSongRepository.delete({
      song_id: dto.song_id,
      playlist_id,
    });
  }

  public async getUserPlaylist(
    user_id: number,
  ): Promise<GetUserPlaylistResponseData[]> {
    const playlistRecord = await this.playlistRepository.getUserPlaylist(
      user_id,
    );
    if (playlistRecord.length === 0) throw NotFoundPlaylistException;

    return playlistRecord;
  }

  public async modifyCover(
    playlist_id: number,
    cover_url: string,
    key: string,
  ): Promise<void> {
    const playlistRecord = await this.playlistRepository.findMyPlaylist(
      playlist_id,
      this.request.user.sub,
    );
    if (!playlistRecord) throw NotFoundPlaylistException;
    s3.getObject(
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      },
      async (err, data) => {
        if (err) throw S3GetObjectException;
        const { hex } = await getAverageColor(data.Body as Buffer);
        await this.playlistRepository.update(playlist_id, {
          cover_url,
          color_hex: hex.replace('#', ''),
        });
      },
    );
  }

  public async getRandomPlaylist(
    page: number,
    size: number,
  ): Promise<GetRandomPlaylistResponseData> {
    if (isNaN(page) || isNaN(size)) throw QueryBadRequest;
    if (page <= 0 || size <= 0) throw QueryBadRequest;

    const playlistRecords = await this.playlistRepository.getRandomPlaylist(
      page,
      size,
    );
    if (playlistRecords.length === 0) NotFoundPlaylistException;
    return { playlist: playlistRecords };
  }

  public async getPopularPlaylist(
    page: number,
    size: number,
  ): Promise<GetPopularPlaylistResponseData> {
    if (isNaN(page) || isNaN(size)) throw QueryBadRequest;
    if (page <= 0 || size <= 0) throw QueryBadRequest;

    const playlistRecords = await this.playlistRepository.getPopularPlaylist(
      page,
      size,
    );
    if (playlistRecords.length === 0) NotFoundPlaylistException;
    return { playlist: playlistRecords };
  }
}
