import { Application } from "express";
import {
  authenticate,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user";
import { verifyToken } from "../middleware/authentication";

export default function user_routes(app: Application) {
  app.get("/users", getAllUsers);
  app.post("/users/create", createUser);
  app.get("/users/:id", getUserById);
  app.put("/users/:id", verifyToken, updateUserById);
  app.delete("/users/:id", verifyToken, deleteUserById);
  app.post("/users/authenticate", authenticate);
}
