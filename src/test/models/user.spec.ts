import { defaultValues, specs } from "../../constant";
import { UserStore } from "../../models/users";
import { BaseUserInterface, BaseUserWithAuthInterface, UserInterface } from "../../types";

const userStore = new UserStore();

const testCorrectUser = (dataToTest: UserInterface, expectedData: BaseUserWithAuthInterface) => {
  const { username, password, firstname, lastname } = dataToTest;
  const expectedUser = { username, password, firstname, lastname };

  return expect(expectedUser).toBe(expectedData);
};

describe(specs.models.user.describe, () => {
  const user: BaseUserWithAuthInterface = defaultValues.user;

  it(specs.models.user.it.haveGetAllUsers, () => {
    expect(userStore.getAllUsers).toBeDefined();
  });

  it(specs.models.user.it.haveGetUserById, () => {
    expect(userStore.getUserById).toBeDefined();
  });

  it(specs.models.user.it.haveCreateUser, () => {
    expect(userStore.createUser).toBeDefined();
  });

  it(specs.models.user.it.haveUpdateUser, () => {
    expect(userStore.updateUserById).toBeDefined();
  });

  it(specs.models.user.it.haveRemoveUser, () => {
    expect(userStore.deleteUserById).toBeDefined();
  });

  it(specs.models.user.it.canReturnUsers, async () => {
    const { data: users } = await userStore.getAllUsers();
    testCorrectUser(users[0], user)
  });

  it(specs.models.user.it.canCreateUser, async () => {
    const { data: createdUser } = await userStore.createUser(user);

    if (createdUser) {
      testCorrectUser(createdUser, user)
    }
    await userStore.deleteUserById(createdUser.id);
  });

  it(specs.models.user.it.canReturnUserById, async () => {
    const { data: createdUser } = await userStore.createUser(user);
    const { data: users } = await userStore.getUserById(createdUser.id);
    expect(users).toEqual(createdUser);
    await userStore.deleteUserById(createdUser.id);
  });

  it(specs.models.user.it.canRemoveUser, async () => {
    const { data: createdUser } = await userStore.createUser(user);
    await userStore.deleteUserById(createdUser.id);
    testCorrectUser(createdUser, user)
  });

  it(specs.models.user.it.canUpdateUser, async () => {
    const { data: createdUser } = await userStore.createUser(user);
    const newUserData: BaseUserInterface = {
      firstname: "John",
      lastname: "Wick",
    };

    const {
      data: { firstname, lastname },
    } = await userStore.updateUserById(createdUser.id, newUserData);
    expect(firstname).toEqual(newUserData.firstname);
    expect(lastname).toEqual(newUserData.lastname);

    await userStore.deleteUserById(createdUser.id);
  });
});
