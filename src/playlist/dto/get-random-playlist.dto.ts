export class GetRandomPlaylistResponseData {
  playlist: RandomPlaylistVo[];
}

export class RandomPlaylistVo {
  name: string;
  author: string;
  cover_url: string;
  color_hex: string;
  playlist_id: number;
  user_id: number;
}
