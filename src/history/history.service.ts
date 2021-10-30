import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NotFoundSongException,
  QueryBadRequest,
} from 'src/shared/exception/exception.index';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { Song } from 'src/song/entity/song.entity';
import { SongRepository } from 'src/song/entity/song.repository';
import { GetHistoryResponseData } from './dto/get-historys.dto';
import { HistoryView } from './entity/history-view/history-view.entity';
import { HistoryViewRepository } from './entity/history-view/history-view.repository';
import { History } from './entity/history.entity';
import { HistoryRepository } from './entity/history.repository';

@Injectable({ scope: Scope.REQUEST })
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: HistoryRepository,
    @InjectRepository(Song)
    private readonly songRepository: SongRepository,
    @InjectRepository(HistoryView)
    private readonly historyViewRepository: HistoryViewRepository,
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

  public async getHistorys(
    page: number,
    size: number,
  ): Promise<GetHistoryResponseData> {
    if (isNaN(page) || isNaN(size)) throw QueryBadRequest;
    if (page <= 0 || size <= 0) throw QueryBadRequest;

    const songRecords = await this.historyViewRepository.getHistorys(
      page,
      size,
      this.request.user.sub,
    );
    if (songRecords.length === 0) throw NotFoundSongException;
    const max_song = await this.historyRepository.count({
      user_id: this.request.user.sub,
    });
    return { max_song, song: songRecords };
  }
}
