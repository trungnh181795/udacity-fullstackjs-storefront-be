import { UserStore } from "../../models/users";
import { BaseUserInterface, BaseUserWithAuthInterface } from "../../types";

const userStore = new UserStore();

describe("User Model", () => {
  const user: BaseUserWithAuthInterface = {
    username: "ChrisAnne",
    firstname: "Chris",
    lastname: "Anne",
    password: "password123",
  };

  async function createUser(user: BaseUserWithAuthInterface) {
    return userStore.createUser(user);
  }

  async function deleteUser(id: number) {
    return userStore.deleteUserById(id);
  }

  it("should have getUser method", () => {
    expect(userStore.getAllUsers).toBeDefined();
  });

  it("should have a show method", () => {
    expect(userStore.getUserById).toBeDefined();
  });

  it("should have a create method", () => {
    expect(userStore.createUser).toBeDefined();
  });

  it("should have a remove method", () => {
    expect(userStore.deleteUserById).toBeDefined();
  });

  it("should create a user", async () => {
    const { data: createdUser } = await createUser(user);
    if (createdUser) {
      expect(createdUser.username).toBe(user.username);
      expect(createdUser.firstname).toBe(user.firstname);
      expect(createdUser.lastname).toBe(user.lastname);
    }
    await deleteUser(createdUser.id);
  });

  it("should return a list of users", async () => {
    const { data: users } = await userStore.getAllUsers();
    expect(users[0].username).toEqual("ChrisAnne");
    expect(users[0].id).toEqual(1);
    expect(users[0].firstname).toEqual("Chris");
    expect(users[0].lastname).toEqual("Anne");
  });

  it(" should return the correct users", async () => {
    const { data: createdUser } = await createUser(user);
    const { data: users } = await userStore.getUserById(createdUser.id);
    expect(users).toEqual(createdUser);
    await deleteUser(createdUser.id);
  });

  it("should remove the user", async () => {
    const { data: createdUser } = await createUser(user);
    await deleteUser(createdUser.id);
    expect(createdUser.firstname).toEqual("Chris");
    expect(createdUser.lastname).toEqual("Anne");
  });

  it("should update the user", async () => {
    const { data: createdUser } = await createUser(user);
    const newUserData: BaseUserInterface = {
      firstname: "Kris",
      lastname: "Han",
    };

    const {
      data: { firstname, lastname },
    } = await userStore.updateUserById(createdUser.id, newUserData);
    expect(firstname).toEqual(newUserData.firstname);
    expect(lastname).toEqual(newUserData.lastname);

    await deleteUser(createdUser.id);
  });
});
