export interface OrderProductInterface {
  product_id: number;
  quantity: number;
}

export interface BaseOrderInterface {
  products: OrderProductInterface[];
  user_id: number;
  status: OrderStatus
}

export interface OrderInterface extends BaseOrderInterface {
  id: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}
