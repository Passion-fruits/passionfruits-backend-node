import { EntityRepository, Repository } from 'typeorm';
import { Kdt } from './kdt.entity';

@EntityRepository(Kdt)
export class KdtRepository extends Repository<Kdt> {
  public async successPayment(
    kdtAmount: number,
    user_id: number,
  ): Promise<void> {
    await this.createQueryBuilder()
      .update(Kdt)
      .set({ add_kdt: () => `add_kdt + ${kdtAmount}` })
      .where('user_id = :user_id', { user_id })
      .execute();
  }
}
