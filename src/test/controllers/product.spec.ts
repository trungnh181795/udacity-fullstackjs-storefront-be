import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import app from "../../server";
import { BaseProductInterface, BaseUserWithAuthInterface } from "../../types";
import { defaultValues, specs } from "../../constant";

const request = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe(specs.controller.product.describe, () => {
  const product: BaseProductInterface = defaultValues.product;

  const testData = {
    userToken: null,
    userId: null,
    productId: null,
  };

  beforeAll(async () => {
    const userData: BaseUserWithAuthInterface = defaultValues.user;

    const { body } = await request.post("/users/create").send(userData);
    testData.userToken = body.tokens;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { user } = jwt.verify(testData.userToken, SECRET);
    testData.userId = user.id;
  });

  afterAll(async () => {
    await request
      .delete(`/users/${testData.userId}`)
      .set("Authorization", "bearer " + testData.userToken);
  });

  it(specs.controller.product.it.haveGetAllProductEndpoint, async () => {
    const { status } = await request.get("/products");
    expect(status).toBe(200);
    
  });

  it(specs.controller.product.it.haveCreateProductEndpoint, async () => {
    const { status, body } = await request
      .post("/products/create")
      .send(product)
      .set("Authorization", "bearer " + testData.userToken);
    testData.productId = body.product.id;

    expect(status).toBe(201);
    
  });

  it(specs.controller.product.it.haveGetProductByIdEndpoint, async () => {
    const { status } = await request.get(`/products/${testData.productId}`);
    expect(status).toBe(200);
    
  });

  it(specs.controller.product.it.haveUpdateProductEndpoint, async () => {
    const newProductData: BaseProductInterface = defaultValues.newProduct;
    const { status } = await request
      .put(`/products/${testData.productId}`)
      .send(newProductData)
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(201);
    
  });

  it(specs.controller.product.it.haveRemoveProductEndpoint, async () => {
    const { status } = await request
      .delete(`/products/${testData.productId}`)
      .set("Authorization", "bearer " + testData.userToken);
    expect(status).toBe(201);
    
  });
});
