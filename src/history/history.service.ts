import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundSongException } from 'src/shared/exception/exception.index';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { Song } from 'src/song/entity/song.entity';
import { SongRepository } from 'src/song/entity/song.repository';
import { History } from './entity/history.entity';
import { HistoryRepository } from './entity/history.repository';

@Injectable({ scope: Scope.REQUEST })
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: HistoryRepository,
    @InjectRepository(Song)
    private readonly songRepository: SongRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public async recordHistory(song_id: number): Promise<void> {
    const songRecord = await this.songRepository.findOne(song_id);
    const historyRecord = await this.historyRepository.findOne({
      song_id,
      user_id: this.request.user.sub,
    });

    if (!songRecord) throw NotFoundSongException;

    if (historyRecord)
      await this.historyRepository.updateHistory(historyRecord);
    else
      await this.historyRepository.recordHistory(
        song_id,
        this.request.user.sub,
      );
  }
}
