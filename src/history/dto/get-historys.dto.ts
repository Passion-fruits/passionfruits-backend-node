export class GetHistoryResponseData {
  max_song: number;
  song: HistorySongVo[];
}

export class HistorySongVo {
  song_id: number;
  user_id: number;
  cover_url: string;
  song_url: string;
  title: string;
  artist: string;
  created_at: Date;
}
