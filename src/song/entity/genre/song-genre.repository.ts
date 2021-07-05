import { EntityRepository, Repository } from 'typeorm';
import { SongGenre } from './song-genre.entity';

@EntityRepository(SongGenre)
export class SongGenreRepository extends Repository<SongGenre> {
  public async createSongGenre(
    song_id: number,
    genre_type: number,
  ): Promise<SongGenre> {
    let newSongGenre: SongGenre;
    newSongGenre = this.create({
      song_id,
      genre_type,
    });
    return await this.save(newSongGenre);
  }
}
