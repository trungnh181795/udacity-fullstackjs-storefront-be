import { defaultValues, specs } from "../../constant";
import { UserStore } from "../../models/users";
import { BaseUserInterface, BaseUserWithAuthInterface } from "../../types";

const userStore = new UserStore();

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
    const { data: createdUser } = await userStore.createUser(user);
    expect(users.length).toBeGreaterThan(0);
    await userStore.deleteUserById(createdUser.id);
  });

  it(specs.models.user.it.canCreateUser, async () => {
    const { data: createdUser } = await userStore.createUser(user);
    expect(createdUser.firstname).toEqual(user.firstname);
    expect(createdUser.lastname).toEqual(user.lastname);

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
    const { id, firstname, lastname } = createdUser;
    expect({ id, firstname, lastname }).toEqual({
      id,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  });

  it(specs.models.user.it.canUpdateUser, async () => {
    const { data: createdUser } = await userStore.createUser(user);
    const newUserData: BaseUserInterface = defaultValues.newUser;

    const {
      data: { firstname, lastname },
    } = await userStore.updateUserById(createdUser.id, newUserData);
    expect(firstname).toEqual(newUserData.firstname);
    expect(lastname).toEqual(newUserData.lastname);

    await userStore.deleteUserById(createdUser.id);
  });
});
