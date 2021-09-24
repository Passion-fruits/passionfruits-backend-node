import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PlaylistRepository } from './entity/playlist.repository';

@Injectable({ scope: Scope.REQUEST })
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistRepository)
    private readonly playlistRepository: PlaylistRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public createPlaylist(dto: CreatePlaylistDto): void {
    this.playlistRepository.createPlaylist(dto, this.request.user.sub);
  }
}
