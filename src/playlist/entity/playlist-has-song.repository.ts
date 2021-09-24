import { EntityRepository, Repository } from 'typeorm';
import { AddSongInPlaylistDto } from '../dto/add-song-in-playlist.dto';
import { PlaylistHasSong } from './playlist-has-song.entity';

@EntityRepository(PlaylistHasSong)
export class PlaylistHasSongRepository extends Repository<PlaylistHasSong> {
  public async addSongInPlaylist(
    dto: AddSongInPlaylistDto,
    playlist_id: number,
  ): Promise<void> {
    let newPlaylistHasSong: PlaylistHasSong;
    newPlaylistHasSong = this.create({
      song_id: dto.song_id,
      playlist_id,
    });
    await this.save(newPlaylistHasSong);
  }
}
