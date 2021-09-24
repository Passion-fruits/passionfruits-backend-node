import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/song/entity/song.entity';

@Entity('playlist_has_song')
export class PlaylistHasSong {
  @PrimaryColumn()
  @ManyToOne(() => Playlist, (playlist) => playlist.play_list_has_song)
  @JoinColumn({ name: 'playlist_id' })
  playlist_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Song, (song) => song.playlist_has_song)
  @JoinColumn({ name: 'song_id' })
  song_id: number;
}
