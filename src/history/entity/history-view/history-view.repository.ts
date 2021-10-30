import { EntityRepository, Repository } from 'typeorm';
import { HistorySongVo } from 'src/history/dto/get-historys.dto';
import { HistoryView } from './history-view.entity';

@EntityRepository(HistoryView)
export class HistoryViewRepository extends Repository<HistoryView> {
  public getHistorys(
    page: number,
    size: number,
    user_id: number,
  ): Promise<HistorySongVo[]> {
    return this.createQueryBuilder('view')
      .select('view.song_id', 'song_id')
      .addSelect('view.user_id', 'user_id')
      .addSelect('view.cover_url', 'cover_url')
      .addSelect('view.song_url', 'song_url')
      .addSelect('view.title', 'title')
      .addSelect('view.artist', 'artist')
      .addSelect('view.created_at', 'created_at')
      .limit(size)
      .offset((page - 1) * size)
      .orderBy('view.created_at', 'DESC')
      .where('view.user_id = :user_id', { user_id })
      .getRawMany();
  }
}
