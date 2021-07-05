import { EntityRepository, Repository } from 'typeorm';
import { Mood } from './mood.entity';

@EntityRepository(Mood)
export class MoodRepository extends Repository<Mood> {
  public async createMood(song_id: number, mood_type: number): Promise<Mood> {
    let newMood: Mood;
    newMood = this.create({
      song_id,
      mood_type,
    });
    return await this.save(newMood);
  }
}
