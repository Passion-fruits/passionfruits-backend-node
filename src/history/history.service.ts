import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { History } from './entity/history.entity';
import { HistoryRepository } from './entity/history.repository';

@Injectable({ scope: Scope.REQUEST })
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: HistoryRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public async recordHistory(song_id: number): Promise<void> {
    const historyRecord = await this.historyRepository.findOne({
      song_id,
      user_id: this.request.user.sub,
    });

    if (historyRecord)
      await this.historyRepository.updateHistory(historyRecord);
    else
      await this.historyRepository.recordHistory(
        song_id,
        this.request.user.sub,
      );
  }
}
