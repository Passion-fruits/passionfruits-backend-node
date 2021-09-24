import { EntityRepository, Repository } from 'typeorm';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { Playlist } from './playlist.entity';

@EntityRepository(Playlist)
export class PlaylistRepository extends Repository<Playlist> {
  public async createPlaylist(
    dto: CreatePlaylistDto,
    user_id: number,
  ): Promise<void> {
    let newPlaylist: Playlist;
    newPlaylist = this.create({
      name: dto.name,
      user: user_id,
    });
    await this.save(newPlaylist);
  }
}
