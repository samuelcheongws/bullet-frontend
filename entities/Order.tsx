export type OrderType = 'TAKE_PROFIT' | 'STOP_LOSS';

export interface Order {
  id: string;
  symbol: string;
  order_type: OrderType;
  trigger_price: number;
  percentage: number;
  size: number;
  estimated_pnl: number;
  status: 'ACTIVE' | 'INACTIVE';
}

const mockOrders: Order[] = [
  {
    id: '1',
    symbol: 'BTC-PERP',
    order_type: 'TAKE_PROFIT',
    trigger_price: 70000,
    percentage: 50,
    size: 0.5,
    estimated_pnl: 500,
    status: 'ACTIVE',
  },
  {
    id: '2',
    symbol: 'BTC-PERP',
    order_type: 'STOP_LOSS',
    trigger_price: 60000,
    percentage: 25,
    size: 0.25,
    estimated_pnl: -200,
    status: 'INACTIVE',
  },
];

export class Order {
  static async list(_sort?: string): Promise<Order[]> {
    return Promise.resolve(mockOrders);
  }

  static async create(order: Partial<Order>): Promise<Order> {
    const newOrder = { ...order, id: Math.random().toString(36).slice(2), status: 'ACTIVE' } as Order;
    mockOrders.push(newOrder);
    return Promise.resolve(newOrder);
  }

  static async update(id: string, update: Partial<Order>): Promise<Order | undefined> {
    const idx = mockOrders.findIndex(o => o.id === id);
    if (idx !== -1) {
      mockOrders[idx] = { ...mockOrders[idx], ...update };
      return Promise.resolve(mockOrders[idx]);
    }
    return Promise.resolve(undefined);
  }

  static async delete(id: string): Promise<void> {
    const idx = mockOrders.findIndex(o => o.id === id);
    if (idx !== -1) mockOrders.splice(idx, 1);
    return Promise.resolve();
  }
}
