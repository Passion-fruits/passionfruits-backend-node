export class GetPlaylistResponseData {
  playlist: PlaylistVo;
  songs: SongVo[];
}

export class PlaylistVo {
  name: string;
  author: string;
  like: number;
  cover_url: string;
  color_hex: string;
  playlist_id: number;
  user_id: number;
  created_at: Date;
}

export class SongVo {
  song_id: number;
  user_id: number;
  cover_url: string;
  song_url: string;
  title: string;
  mood: string;
  genre: string;
  created_at: Date;
  artist: string;
  like: number;
}
