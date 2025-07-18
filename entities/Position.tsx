// src/entities/Position.ts

export interface PositionType {
  id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entry_price: number;
  mark_price: number;
  liquidation_price: number;
  total_value: number;
  unrealized_pnl: number;
  unrealized_pnl_percent: number;
  leverage: number;
  margin: number;
  last_price: number;
}

export const Position = {
  async list(sort: string = "-created_date"): Promise<PositionType[]> {
    // Mock data
    return Promise.resolve([
      {
        id: "btc-1",
        symbol: "BTC-PERP",
        side: "LONG",
        size: 0.5,
        entry_price: 30000,
        mark_price: 31000,
        liquidation_price: 25000,
        total_value: 15500,
        unrealized_pnl: 500,
        unrealized_pnl_percent: 10,
        leverage: 5,
        margin: 1500,
        last_price: 31000
      },
      {
        id: "eth-1",
        symbol: "ETH-PERP",
        side: "SHORT",
        size: 10,
        entry_price: 2000,
        mark_price: 1950,
        liquidation_price: 2300,
        total_value: 19500,
        unrealized_pnl: 500,
        unrealized_pnl_percent: 5,
        leverage: 10,
        margin: 5000,
        last_price: 1950
      }
    ]);
  }
};
