import { EntityRepository, Repository } from 'typeorm';
import { MoodType } from './mood-type.entity';

@EntityRepository(MoodType)
export class MoodTypeRepository extends Repository<MoodType> {}
