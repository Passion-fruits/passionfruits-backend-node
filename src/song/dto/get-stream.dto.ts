export class GetStreamResponseData {
  max_song: number;
  songs: SongData[] | any[];
}

export class SongData {
  cover_url: string;
  song_url: string;
  title: string;
  description: string;
  created_at: Date;
  genre: string;
  artist: string;
  like: number;
  comment: number;
}
