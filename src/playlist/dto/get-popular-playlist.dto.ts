export class GetPopularPlaylistResponseData {
  playlist: PopularPlaylistVo[];
}

export class PopularPlaylistVo {
  name: string;
  author: string;
  cover_url: string;
  playlist_id: number;
  user_id: number;
  score: number;
}
