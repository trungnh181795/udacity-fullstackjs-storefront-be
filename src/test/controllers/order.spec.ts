/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest";
import app from "../../server";
import { BaseProductInterface, BaseUserWithAuthInterface } from "../../types";
import { defaultValues, specs } from "../../constant";
import jwt, { Secret } from 'jsonwebtoken'

const request = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe(specs.controller.order.describe, () => {
  const testData = {
    userToken: null,
    userId: null,
    productId: null,
    orderId: null,
  };

  beforeAll(async () => {
    const userData: BaseUserWithAuthInterface = defaultValues.user;
    const product: BaseProductInterface = defaultValues.product;

    const { body: createdUser } = await request.post("/users/create").send(userData);
    testData.userToken = createdUser.tokens;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { user } = jwt.verify(testData.userToken, SECRET);
    testData.userId = user.id;

    const { body: createdProduct } = await request
      .post("/products/create")
      .send(product)
      .set("Authorization", "bearer " + testData.userToken);

    testData.productId = createdProduct.product.id;
  });

  afterAll(async () => {
    await request.delete(`/products/${testData.productId}`);
  })

  it(specs.controller.order.it.haveGetAllOrderEndpoint, async () => {
    const { status } = await request
      .get("/orders")
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(200);
  });

  it(specs.controller.order.it.haveCreateOrderEndpoint, async () => {
    const { status, body } = await request
      .post("/orders/create")
      .set("Authorization", "Bearer " + testData.userToken)
      .send({
        user_id: testData.userId,
        products: defaultValues.order.products(testData.productId),
        order_status: defaultValues.order.status
      });
    testData.orderId = body.id;

    expect(status).toBe(201);
  });

  it(specs.controller.order.it.haveGetOrderByIdEndpoint, async () => {
    console.log('orderId', testData.orderId)
    const { status } = await request
      .get(`/orders/${testData.orderId}`)
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(200);
  });

  it(specs.controller.order.it.haveUpdateOrderEndpoint, async () => {
    const { status } = await request
      .put(`/orders/${testData.orderId}`)
      .set("Authorization", "Bearer " + testData.userToken)
      .send({
        user_id: testData.userId,
        products: defaultValues.newOrder.products(testData.productId),
        order_status: defaultValues.newOrder.status
      });

    expect(status).toBe(201);
  });

  it(specs.controller.order.it.haveRemoveOrderEndpoint, async () => {
    const { status } = await request
      .delete(`/orders/${testData.orderId}`)
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(201);
  });
});
