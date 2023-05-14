import { Request, Response } from "express";
import { ProductStore } from "../models/products";
import { messages } from "../constant";

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
    const { name, price } = req.body;

    if (!name || !price) {
      return res
        .status(400)
        .send(messages.controllers.product.createProductFailed);
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
    const { id } = req.params;

    if (!id) {
      return res.status(400).send(messages.controllers.product.getProductByIdFailed);
    }

    const { data: product } = await productStore.getProductById(parseInt(id));
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, price } = req.params;

    if (!name || !price || !id) {
      return res.status(400).send(messages.controllers.product.updateProductFailed);
    }

    const { data: product } = await productStore.updateProductById(
      parseInt(id),
      {
        name,
        price: parseInt(price),
      }
    );
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      return res.status(400).send(messages.controllers.product.deleteProductFailed);
    }

    await productStore.deleteProduct(id);
    res.send(`Product with id ${id} successfully deleted.`);
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
