import { OrderStore } from "../../models/orders";
import { UserStore } from "../../models/users";
import { ProductStore } from "../../models/products";
import { BaseOrderInterface, OrderStatus } from "../../types";

const orderStore = new OrderStore();

describe("Order Model", () => {
  const userStore = new UserStore();
  const productStore = new ProductStore();

  let order: BaseOrderInterface, user_id: number, product_id: number;

  function createOrder(order: BaseOrderInterface) {
    return orderStore.createOrder(order);
  }

  function deleteOrder(id: number) {
    return orderStore.deleteOrder(id);
  }

  beforeAll(async () => {
    const { data: user } = await userStore.createUser({
      username: "ChrisAnne",
      firstname: "Chris",
      lastname: "Anne",
      password: "password123",
    });

    user_id = user.id;

    const { data: product } = await productStore.createProduct({
      name: "OrderSpec Product",
      price: 99,
    });

    product_id = product.id;

    order = {
      products: [
        {
          product_id,
          quantity: 5,
        },
      ],
      user_id,
      status: OrderStatus.SUCCESS,
    };
  });

  afterAll(async () => {
    await userStore.deleteUserById(user_id);
    await productStore.deleteProduct(product_id);
  });

  it("should have an index method", () => {
    expect(orderStore.getAllOrders).toBeDefined();
  });

  it("should have a show method", () => {
    expect(orderStore.getOrderById).toBeDefined();
  });

  it("should have a add method", () => {
    expect(orderStore.createOrder).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(orderStore.deleteOrder).toBeDefined();
  });

  it("should add a order", async () => {
    const { data: createdOrder } = await createOrder(order);
    expect(createdOrder).toEqual({
      id: createdOrder.id,
      ...order,
    });

    await deleteOrder(createdOrder.id);
  });

  it("should return a list of orders", async () => {
    const { data: createdOrder } = await createOrder(order);
    const { data: orderList } = await orderStore.getAllOrders();
    expect(orderList).toEqual([createdOrder]);
    await deleteOrder(createdOrder.id);
  });

  it("show method should return the correct orders", async () => {
    const { data: createdOrder } = await createOrder(order);
    const { data: orderData } = await orderStore.getOrderById(createdOrder.id);
    expect(orderData).toEqual(createdOrder);
    await deleteOrder(createdOrder.id);
  });

  it("should update the order", async () => {
    const { data: createdOrder } = await createOrder(order);
    const orderData: BaseOrderInterface = {
      products: [
        {
          product_id,
          quantity: 20,
        },
      ],
      user_id,
      status: OrderStatus.PENDING,
    };
    const {
      data: { products, status },
    } = await orderStore.updateOrderById(createdOrder.id, orderData);
    expect(products).toEqual(orderData.products);
    expect(status).toEqual(orderData.status);
    await deleteOrder(createdOrder.id);
  });

  it("should remove the order item", async () => {
    const { data: createdOrder } = await createOrder(order);
    await deleteOrder(createdOrder.id);
    const { data: orderList } = await orderStore.getAllOrders();
    expect(orderList).toEqual([]);
  });
});
