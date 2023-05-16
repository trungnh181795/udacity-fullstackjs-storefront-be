import { Application } from "express";
import {
  authenticate,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user";
import { verifyAuthToken } from "../middleware/authentication";

export default function user_routes(app: Application) {
  app.get("/users", getAllUsers);
  app.post("/users/create", createUser);
  app.get("/users/:id", getUserById);
  app.put("/users/:id", verifyAuthToken, updateUserById);
  app.delete("/users/:id", verifyAuthToken, deleteUserById);
  app.post("/users/authenticate", authenticate);
}
