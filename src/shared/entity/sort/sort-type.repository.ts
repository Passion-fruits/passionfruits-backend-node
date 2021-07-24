import { EntityRepository, Repository } from 'typeorm';
import { SortType } from './sort-type.entity';

@EntityRepository(SortType)
export class SortTypeRepository extends Repository<SortType> {}
