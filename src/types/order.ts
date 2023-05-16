export interface OrderProductInterface {
  product_id: number;
  quantity: number;
}

export interface BaseOrderInterface {
  products: OrderProductInterface[];
  user_id: number;
  status: boolean
}

export interface OrderInterface extends BaseOrderInterface {
  id: number;
}

export const orderStatus = {
  PENDING: false,
  SUCCESS: true
}
