import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/song/entity/song.entity';

@Entity('playlist_has_song')
export class PlaylistHasSong {
  @PrimaryColumn()
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistHasSong)
  @JoinColumn({ name: 'playlist_id' })
  playlist_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Song, (song) => song.playlistHasSong)
  @JoinColumn({ name: 'song_id' })
  song_id: number;
}
