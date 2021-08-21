export class GetSongsByUserIdResponseData {
  song_count: number;
  songs: SongData[] | any[];
}

export class SongData {
  song_id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: Date;
  genre: number;
  name: string;
  like: number;
  comment: number;
  song_url: string;
  cover_url: string;
}
