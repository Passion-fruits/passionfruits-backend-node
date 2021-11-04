export class GetDonateHistoryResponseData {
  history: DonateHistoryVo[];
}

export class DonateHistoryVo {
  user_id: number;
  profile: string;
  name: string;
  artist: string;
  artist_id: number;
  message_id: number;
  question: string;
  answer: string;
  amount: number;
  tx_hash: string;
}
