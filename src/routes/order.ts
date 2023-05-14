import { Application } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/order";
import { verifyToken } from "../middleware/authentication";

export default function orderRoutes(app: Application) {
  app.get("/orders", getAllOrders);
  app.post("/orders/create", verifyToken, createOrder);
  app.get("/orders/:id", verifyToken, getOrderById);
  app.put("/orders/:id", verifyToken, updateOrder);
  app.delete("/orders/:id", verifyToken, deleteOrder);
}
