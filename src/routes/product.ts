import { Application } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product";
import { verifyToken } from "../utils/authentication-helper";

export default function productRoutes(app: Application) {
  app.get("/products", getAllProducts);
  app.post("/products/create", verifyToken, createProduct);
  app.get("/products/:id", getProductById);
  app.put("/products/:id", verifyToken, updateProduct);
  app.delete("/products/:id", verifyToken, deleteProduct);
}
