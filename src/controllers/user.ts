import { Request, Response } from "express";
import { getUserToken } from "../utils/authentication-helper";
import { UserStore } from "../models/users";

const userStore = new UserStore();

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { data: users } = await userStore.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;
    const username = req.body.username as unknown as string;
    const password = req.body.password as unknown as string;

    if (!firstname || !lastname || !username || !password) {
      res.status(400);
      res.send(
        "Some required parameters are missing! eg. :firstName, :lastName, :userName, :password"
      );
      return false;
    }
    const { data: user } = await userStore.createUser({
      firstname,
      lastname,
      username,
      password,
    });

    res.json(getUserToken(user));
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      return res.status(400).send("Missing required parameter :id.");
    }
    const { data: user } = await userStore.getUserById(id);
    res.json(user);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;
    if (!firstname || !lastname || !id) {
      res.status(400);
      res.send(
        "Some required parameters are missing! eg. :firstName, :lastName, :id"
      );
      return false;
    }
    const { data: user } = await userStore.updateUserById(id, {
      firstname,
      lastname,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400).send("Missing required parameter :id.");
      return false;
    }
    await userStore.deleteUserById(id);
    res.send(`User with id ${id} successfully deleted.`);
  } catch (err) {
    res.status(400).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const username = (req.body.username as unknown as string) || "ChrissAnne";
    const password = (req.body.password as unknown as string) || "password123";
    if (!username || !password) {
      res.status(400);
      res.send(
        "Some required parameters are missing! eg. :username, :password"
      );
      return false;
    }
    const { data: user } = await userStore.authenticate(username, password);
    if (!user) {
      return res.status(401).send(`Wrong password for user ${username}.`);
    }
    res.json(getUserToken(user));
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
