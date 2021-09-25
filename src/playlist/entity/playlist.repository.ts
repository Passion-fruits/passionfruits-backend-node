import { EntityRepository, Repository } from 'typeorm';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { PlaylistVo } from '../dto/get-playlist.dto';
import { GetUserPlaylistResponseData } from '../dto/get-user-playlist.dto';
import { Playlist } from './playlist.entity';

@EntityRepository(Playlist)
export class PlaylistRepository extends Repository<Playlist> {
  public async createPlaylist(
    dto: CreatePlaylistDto,
    user: number,
  ): Promise<void> {
    let newPlaylist: Playlist;
    newPlaylist = this.create({
      name: dto.name,
      user,
    });
    await this.save(newPlaylist);
  }

  public async getPlaylist(playlist_id: number): Promise<PlaylistVo> {
    return await this.createQueryBuilder('pl')
      .innerJoin('pl.user', 'user')
      .innerJoin('user.profile', 'profile')
      .leftJoin('pl.user_like_playlist', 'user_like_playlist')
      .select('pl.name', 'name')
      .addSelect('pl.cover_url', 'cover_url')
      .addSelect('pl.id', 'playlist_id')
      .addSelect('pl.created_at', 'created_at')
      .addSelect('profile.name', 'author')
      .addSelect(
        'COUNT(distinct user_like_playlist.playlist_id, user_like_playlist.user_id)',
        'like',
      )
      .where('pl.id = :playlist_id', { playlist_id })
      .groupBy('pl.id')
      .getRawOne();
  }

  public getUserPlaylist(
    user_id: number,
  ): Promise<GetUserPlaylistResponseData[]> {
    return this.createQueryBuilder('pl')
      .innerJoin('pl.user', 'user')
      .innerJoin('user.profile', 'profile')
      .leftJoin('pl.user_like_playlist', 'user_like_playlist')
      .select('pl.name', 'name')
      .addSelect('pl.cover_url', 'cover_url')
      .addSelect('pl.id', 'playlist_id')
      .addSelect('profile.name', 'author')
      .addSelect(
        'COUNT(distinct user_like_playlist.playlist_id, user_like_playlist.user_id)',
        'like',
      )
      .where('pl.user = :user_id', { user_id })
      .groupBy('pl.id')
      .getRawMany();
  }
}
