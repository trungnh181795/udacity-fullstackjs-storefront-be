export interface BaseProductInterface {
  name: string;
  price: number;
}

export interface ProductInterface extends BaseProductInterface {
  id: number;
}
