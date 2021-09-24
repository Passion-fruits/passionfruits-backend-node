import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NotFoundPlaylistException,
  NotFoundPlaylistHasSongException,
  PlaylistHasSongExistException,
} from 'src/shared/exception/exception.index';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { SongViewRepository } from 'src/song/entity/song-view/song-view.repository';
import { AddSongInPlaylistDto } from './dto/add-song-in-playlist.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { DeleteSongInPlaylistDto } from './dto/delete-song-in-playlist.dto';
import {
  GetPlaylistResponseData,
  PlaylistVo,
  SongVo,
} from './dto/get-playlist.dto';
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
    console.log(playlistRecord);
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
    const playlistRecord = await this.playlistRepository.findOne({
      id: playlist_id,
      user: this.request.user.sub,
    });
    if (!playlistRecord) throw NotFoundPlaylistException;
    const playlistHasSongRecord = await this.playlistHasSongRepository.findOne({
      song_id: dto.song_id,
      playlist_id,
    });
    if (playlistHasSongRecord) throw PlaylistHasSongExistException;

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
}
