import { now } from 'moment';
import { Kdt } from 'src/kdt/entity/kdt.entity';
import { EntityRepository, Repository } from 'typeorm';
import { History } from './history.entity';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
  public async recordHistory(song_id: number, user_id: number): Promise<void> {
    let newHistory: History;
    newHistory = this.create({
      song_id,
      user_id,
    });
    await this.save(newHistory);
  }

  public async updateHistory(history: History): Promise<void> {
    await this.createQueryBuilder()
      .update(History)
      .set({ created_at: new Date().toISOString() })
      .where('user_id = :user_id and song_id = :song_id', {
        user_id: history.user_id,
        song_id: history.song_id,
      })
      .execute();
  }
}
