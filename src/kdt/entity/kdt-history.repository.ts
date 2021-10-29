import { EntityRepository, Repository } from 'typeorm';
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
}
