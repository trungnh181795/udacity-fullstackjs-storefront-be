import { Request, Response } from "express";
import { UserStore } from "../models/users";
import { defaultValues, messages } from "../constant";
import { getUserToken } from "../middleware/authentication";
import { Status } from "../types";

const userStore = new UserStore();

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { data: users } = await userStore.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    if (!firstname || !lastname || !username || !password) {
      res.status(400).send(messages.controllers.user.createUserFailed);
    }

    const { data: user } = await userStore.createUser({
      firstname,
      lastname,
      username,
      password,
    });

    res.status(201).json({
      user_id: user.id,
      tokens: getUserToken(user),
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      return res.status(400).send(messages.controllers.user.getUserByIdFailed);
    }
    const { data: user, status, message } = await userStore.getUserById(id);

    if (status === Status.FAIL) {
      res.status(404).json(message)
    }

    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstname, lastname } = req.body;

    if (!firstname || !lastname || !id) {
      return res.status(400).send(messages.controllers.user.updateUserFailed);
    }

    const { data: user, status, message } = await userStore.updateUserById(parseInt(id), {
      firstname,
      lastname,
    });

    if (status === Status.FAIL) {
      return res.status(404).json(message)
    }

    return res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      return res.status(400).send(messages.controllers.user.deleteUserFailed);
    }
    const { status, message } = await userStore.deleteUserById(id);

    if (status === Status.FAIL) {
      return res.status(404).send(message);
    }

    return res.status(201).send(message);
  } catch (err) {
    res.status(400).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const {
      username = defaultValues.userAuth.username,
      password = defaultValues.userAuth.password,
    } = req.body;
    if (!username || !password) {
      return res.status(400).send(messages.controllers.user.authenticateFailed);
    }
    const { data: user } = await userStore.authenticate(username, password);
    if (!user) {
      return res.status(401).send(`Wrong password for user ${username}.`);
    }
    res.status(200).json(getUserToken(user));
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  authenticate,
};
