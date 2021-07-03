import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { ModifyProfileDto } from '../dto/modify-profile.dto';
import { Sns } from './sns.entity';

@EntityRepository(Sns)
export class SnsRepository extends Repository<Sns> {
  public async createSns(id: number, dto: ModifyProfileDto): Promise<Sns> {
    let newSns: Sns;
    newSns = this.create({
      profile_user_id: id,
      insta: dto.insta,
      facebook: dto.facebook,
      soundcloud: dto.soundcloud,
      youtube: dto.youtube,
    });
    return await this.save(newSns);
  }

  public async modifySns(
    sns: Sns,
    dto: ModifyProfileDto,
  ): Promise<UpdateResult> {
    return await this.update(sns, {
      insta: dto.insta,
      facebook: dto.facebook,
      soundcloud: dto.soundcloud,
      youtube: dto.youtube,
    });
  }
}
