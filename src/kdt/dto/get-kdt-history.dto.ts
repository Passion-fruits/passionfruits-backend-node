export class GetKdtHistoryResponseData {
  history: KdtHistoryVo[];
}

export class KdtHistoryVo {
  order_id: string;
  kdt_type: number;
  created_at: Date;
  amount: number;
  tx_hash: string;
}
