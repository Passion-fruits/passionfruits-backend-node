import { User } from '../../shared/entity/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Kdt } from './kdt.entity';

@EntityRepository(Kdt)
export class KdtRepository extends Repository<Kdt> {
  public async successPayment(
    kdtAmount: number,
    user_id: number,
  ): Promise<void> {
    const kdtRecord = await this.findOne({ user_id });
    await this.update(kdtRecord, { add_kdt: kdtRecord.add_kdt + kdtAmount });
  }
}
