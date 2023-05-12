import { Request, Response } from "express";
import { ProductStore } from "../models/products";

const productStore = new ProductStore();

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { data: products } = await productStore.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;

    if (!name || !price) {
      res.status(400);
      res.send("Some required parameters are missing! eg. :name, :price");
      return false;
    }
    const { data: product } = await productStore.createProduct({ name, price });
    res.json({
      product,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      res.status(400);
      res.send("Missing required parameter :id.");
      return false;
    }
    const { data: product } = await productStore.getProductById(id);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;
    if (!name || !price || !id) {
      res.status(400);
      res.send("Some required parameters are missing! eg. :name, :price, :id");
      return false;
    }
    const { data: product } = await productStore.updateProductById(id, {
      name,
      price,
    });

    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400);
      res.send("Missing required parameter :id.");
      return false;
    }
    await productStore.deleteProduct(id);
    res.send(`Product with id ${id} successfully deleted.`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
