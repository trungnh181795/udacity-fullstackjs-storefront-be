import { Application } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/order";
import { verifyAuthToken } from "../middleware/authentication";

export default function orderRoutes(app: Application) {
  app.get("/orders", getAllOrders);
  app.post("/orders/create", verifyAuthToken, createOrder);
  app.get("/orders/:id", verifyAuthToken, getOrderById);
  app.put("/orders/:id", verifyAuthToken, updateOrder);
  app.delete("/orders/:id", verifyAuthToken, deleteOrder);
}
