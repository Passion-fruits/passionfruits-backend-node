import { DonateHistoryVo } from 'src/kdt/dto/donate-history.dto';
import { EntityRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { KdtHistoryVo } from '../../dto/get-kdt-history.dto';
import { KdtHistory } from './kdt-history.entity';

@EntityRepository(KdtHistory)
export class KdtHistoryRepository extends Repository<KdtHistory> {
  public async successPayment(
    order_id: string,
    payment_key: string,
    amount: number,
    user: number,
    tx_hash: string,
  ): Promise<void> {
    let newKdtHistory: KdtHistory;
    newKdtHistory = this.create({
      order_id,
      payment_key,
      amount,
      user,
      tx_hash,
      kdt_type: 1,
    });
    await this.save(newKdtHistory);
  }

  public async donateKdt(
    message_id: number,
    amount: number,
    user: number,
    tx_hash: string,
  ): Promise<void> {
    console.log(user);
    let newKdtHistory: KdtHistory;
    newKdtHistory = this.create({
      order_id: v4(),
      amount,
      tx_hash,
      kdt_type: 2,
      user,
      message_id,
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

  public getDonateHistory(user_id: number): Promise<DonateHistoryVo[]> {
    return this.createQueryBuilder('hs')
      .innerJoin('hs.user', 'user')
      .innerJoin('user.profile', 'profile')
      .innerJoin('hs.message_id', 'message')
      .innerJoin('message.artist_id', 'artist')
      .innerJoin('artist.profile', 'artist_profile')
      .select('user.id', 'user_id')
      .addSelect('profile.image_path', 'profile')
      .addSelect('profile.name', 'name')
      .addSelect('artist_profile.name', 'artist')
      .addSelect('artist.id', 'artist_id')
      .addSelect('message.id', 'message_id')
      .addSelect('message.question', 'question')
      .addSelect('message.answer', 'answer')
      .addSelect('hs.amount', 'amount')
      .addSelect('hs.tx_hash', 'tx_hash')
      .addSelect('artist_profile.image_path', 'artist_profile')
      .where('hs.user_id = :user_id', { user_id })
      .getRawMany();
  }

  public getAnswerHistory(user_id: number): Promise<DonateHistoryVo[]> {
    return this.createQueryBuilder('hs')
      .innerJoin('hs.user', 'user')
      .innerJoin('user.profile', 'profile')
      .innerJoin('hs.message_id', 'message')
      .innerJoin('message.artist_id', 'artist')
      .innerJoin('artist.profile', 'artist_profile')
      .select('user.id', 'user_id')
      .addSelect('profile.image_path', 'profile')
      .addSelect('profile.name', 'name')
      .addSelect('artist_profile.name', 'artist')
      .addSelect('artist.id', 'artist_id')
      .addSelect('message.id', 'message_id')
      .addSelect('message.question', 'question')
      .addSelect('message.answer', 'answer')
      .addSelect('hs.amount', 'amount')
      .addSelect('hs.tx_hash', 'tx_hash')
      .addSelect('artist_profile.image_path', 'artist_profile')
      .where('message.artist_id = :user_id', { user_id })
      .getRawMany();
  }
}
