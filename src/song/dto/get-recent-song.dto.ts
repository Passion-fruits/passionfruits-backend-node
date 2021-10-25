export class GetRecentSongResponseData {
  max_song: number;
  song: RecentSongVo[];
}

export class RecentSongVo {
  song_id: number;
  user_id: number;
  cover_url: string;
  song_url: string;
  title: string;
  genre: string;
  artist: string;
  like: number;
  created_at: Date;
}
