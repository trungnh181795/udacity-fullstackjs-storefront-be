import { OrderStore } from "../../models/orders";
import { UserStore } from "../../models/users";
import { ProductStore } from "../../models/products";
import { BaseOrderInterface, OrderStatus } from "../../types";
import { defaultValues, specs } from "../../constant";

const orderStore = new OrderStore();

describe(specs.models.order.describe, () => {
  const userStore = new UserStore();
  const productStore = new ProductStore();

  const testData = {
    user_id: null,
    product_id: null,
    order: null,
  };

  beforeAll(async () => {
    const { data: user } = await userStore.createUser(defaultValues.user);
    const { data: product } = await productStore.createProduct(
      defaultValues.product
    );

    testData.user_id = user.id;
    testData.product_id = product.id;
    testData.order = {
      products: [
        {
          product_id: testData.product_id,
          quantity: 5,
        },
      ],
      user_id: testData.user_id,
      status: OrderStatus.SUCCESS,
    };
  });

  afterAll(async () => {
    await userStore.deleteUserById(testData.user_id);
    await productStore.deleteProduct(testData.product_id);
  });

  it(specs.models.order.it.haveGetAllOrders, () => {
    expect(orderStore.getAllOrders).toBeDefined();
  });

  it(specs.models.order.it.haveCreateOrder, () => {
    expect(orderStore.createOrder).toBeDefined();
  });

  it(specs.models.order.it.haveGetOrderById, () => {
    expect(orderStore.getOrderById).toBeDefined();
  });

  it(specs.models.order.it.haveRemoveOrder, () => {
    expect(orderStore.deleteOrder).toBeDefined();
  });

  it(specs.models.order.it.canReturnOrders, async () => {
    const { data: createdOrder } = await orderStore.createOrder(testData.order);
    const { data: orderList } = await orderStore.getAllOrders();
    expect(orderList).toEqual([createdOrder]);
    await orderStore.deleteOrder(createdOrder.id);
  });

  it(specs.models.order.it.canCreateOrder, async () => {
    const { data: createdOrder } = await orderStore.createOrder(testData.order);
    expect(createdOrder).toEqual({
      id: createdOrder.id,
      ...testData.order,
    });

    await orderStore.deleteOrder(createdOrder.id);
  });

  it(specs.models.order.it.canReturnOrderById, async () => {
    const { data: createdOrder } = await orderStore.createOrder(testData.order);
    const { data: orderData } = await orderStore.getOrderById(createdOrder.id);
    expect(orderData).toEqual(createdOrder);
    await orderStore.deleteOrder(createdOrder.id);
  });

  it(specs.models.order.it.canUpdateOrder, async () => {
    const { data: createdOrder } = await orderStore.createOrder(testData.order);
    const orderData: BaseOrderInterface = {
      products: [
        {
          product_id: testData.product_id,
          quantity: 20,
        },
      ],
      user_id: testData.user_id,
      status: OrderStatus.PENDING,
    };
    const {
      data: { products, status },
    } = await orderStore.updateOrderById(createdOrder.id, orderData);
    expect(products).toEqual(orderData.products);
    expect(status).toEqual(orderData.status);
    await orderStore.deleteOrder(createdOrder.id);
  });

  it(specs.models.order.it.canRemoveOrder, async () => {
    const { data: createdOrder } = await orderStore.createOrder(testData.order);
    await orderStore.deleteOrder(createdOrder.id);
    const { data: orderList } = await orderStore.getAllOrders();
    expect(orderList).toEqual([]);
  });
});
