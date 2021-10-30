import { EntityRepository, Repository } from 'typeorm';
import {
  GetKdtHistoryResponseData,
  KdtHistoryVo,
} from '../dto/get-kdt-history.dto';
import { KdtHistory } from './kdt-history.entity';

@EntityRepository(KdtHistory)
export class KdtHistoryRepository extends Repository<KdtHistory> {
  public async successPayment(
    order_id: string,
    payment_key: string,
    amount: number,
    user: number,
  ): Promise<void> {
    let newKdtHistory: KdtHistory;
    newKdtHistory = this.create({
      order_id,
      payment_key,
      amount,
      user,
      kdt_type: 1,
    });
    await this.save(newKdtHistory);
  }

  public async getKdtHistory(user_id: number): Promise<KdtHistoryVo[]> {
    return this.createQueryBuilder('hs')
      .select('hs.order_id', 'order_id')
      .addSelect('hs.created_at', 'created_at')
      .addSelect('hs.amount', 'amount')
      .addSelect('hs.tx_hash', 'tx_hash')
      .addSelect('hs.kdt_type', 'kdt_type')
      .where('hs.user_id = :user_id', { user_id })
      .getRawMany();
  }
}
