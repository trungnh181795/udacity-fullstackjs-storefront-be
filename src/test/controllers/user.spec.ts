import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import { BaseUserWithAuthInterface } from "../../types";
import app from "../../server";
import { defaultValues, specs } from "../../constant";

const request = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe(specs.controller.user.describe, () => {
  const userData: BaseUserWithAuthInterface = defaultValues.user;

  const testData = {
    userToken: null,
    userId: null,
  };

  it(specs.controller.user.it.haveGetAllUserEndpoint, async () => {
    const { status } = await request
      .get("/users")
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(200);
  });

  it(specs.controller.user.it.haveCreateUserEndpoint, async () => {
    const { body, status } = await request.post("/users/create").send(userData);
    testData.userToken = body.tokens;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user } = jwt.verify(testData.userToken, SECRET);
    testData.userId = user.id;

    expect(status).toBe(201);
  });

  it(specs.controller.user.it.haveGetUserByIdEndpoint, async () => {
    const { status } = await request
      .get(`/users/${testData.userId}`)
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(200);
  });

  it(specs.controller.user.it.haveUpdateUserEndpoint, async () => {
    const newUserData: BaseUserWithAuthInterface = {
      ...userData,
      ...defaultValues.newUser,
    };

    const { status } = await request
      .put(`/users/${testData.userId}`)
      .send(newUserData)
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(201);
  });

  it(specs.controller.user.it.haveAuthEndpoint, async () => {
    const { status } = await request
      .post("/users/authenticate")
      .send({
        username: userData.username,
        password: userData.password,
      })
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(200);
  });

  it(specs.controller.user.it.haveRejectedAuthEndpoint, async () => {
    const { status } = await request
      .post("/users/authenticate")
      .send({
        username: userData.username,
        password: "wrong password",
      })
      .set("Authorization", "bearer " + testData.userToken);

    expect(status).toBe(401);
  });

  it(specs.controller.user.it.haveRemoveUserEndpoint, async () => {
    const { status } = await request
      .delete(`/users/${testData.userId}`)
      .set("Authorization", "bearer " + testData.userToken);
    expect(status).toBe(201);
  });
});
