import { Application } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product";
import { verifyAuthToken } from "../middleware/authentication";

export default function productRoutes(app: Application) {
  app.get("/products", getAllProducts);
  app.post("/products/create", verifyAuthToken, createProduct);
  app.get("/products/:id", getProductById);
  app.put("/products/:id", verifyAuthToken, updateProduct);
  app.delete("/products/:id", verifyAuthToken, deleteProduct);
}
