import { SongGenre } from 'src/song/entity/genre/song-genre.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genre_type')
export class GenreType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 12 })
  name: string;

  @OneToMany(() => SongGenre, (songGenre) => songGenre.genre_type)
  song_genre: SongGenre[];
}
