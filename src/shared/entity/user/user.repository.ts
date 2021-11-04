import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findPrivateKeyById(id: number): Promise<{ private_key: string }> {
    return this.findOne({ select: ['private_key'], where: { id } });
  }
}
