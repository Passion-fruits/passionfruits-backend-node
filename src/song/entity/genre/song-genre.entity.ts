import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Song } from '../../../song/entity/song.entity';
import { GenreType } from 'src/shared/entity/genre/genre-type.entity';

@Entity('song_genre')
export class SongGenre {
  @PrimaryColumn()
  @OneToOne(() => Song, (song) => song.mood)
  @JoinColumn({ name: 'song_id' })
  song_id: number;

  @ManyToOne(() => GenreType, (genreType) => genreType.song_genre)
  @JoinColumn({ name: 'genre_type_id' })
  genre_type: number;
}
