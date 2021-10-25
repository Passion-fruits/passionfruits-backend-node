export class GetPopularSongResponseData {
  max_song: number;
  song: PopularSongVo[];
}

export class PopularSongVo {
  score: number;
  song_id: number;
  user_id: number;
  cover_url: string;
  song_url: string;
  title: string;
  genre: string;
  artist: string;
  like: number;
}
