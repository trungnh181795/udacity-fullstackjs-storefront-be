import { orderStatus } from "../types";

export const defaultValues = {
  userAuth: {
    username: "johnsmith",
    password: "test123",
  },
  user: {
    username: "johnsmith",
    firstname: "John",
    lastname: "Smith",
    password: "test123",
  },
  newUser: {
    firstname: "John",
    lastname: "Wick",
  },
  product: {
    name: "test",
    price: 3000,
  },
  newProduct: {
    name: "test 2",
    price: 30000,
  },
  order: {
    products: (product_id: number) => [
      {
        product_id,
        quantity: 5,
      },
    ],
    status: orderStatus.PENDING,
  },
  newOrder: {
    products: (product_id: number) => [
      {
        product_id,
        quantity: 5,
      },
    ],
    status: orderStatus.PENDING,
  },
};
