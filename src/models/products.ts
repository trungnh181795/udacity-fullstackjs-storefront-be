import {
  BaseProductInterface,
  ProcessResponse,
  ProductInterface,
  Status,
} from "../types";
import { useDatabase } from "../utils/use-database";

export class ProductStore {
  private readonly sqlQueries = {
    getAllProducts: "SELECT * FROM products",
    createProduct:
      "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *",
    getProductById: "SELECT * FROM products WHERE id=($1)",
    updateProductById:
      "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
    deleteProductById: "DELETE FROM products WHERE id=($1)",
  };

  async getAllProducts(): Promise<ProcessResponse<ProductInterface[]>> {
    try {
      const rows = await useDatabase<ProductInterface>(
        this.sqlQueries.getAllProducts
      );
      return {
        status: Status.SUCCESS,
        data: rows,
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to get products. The error is: ${err}`,
      };
    }
  }

  async createProduct(
    product: BaseProductInterface
  ): Promise<ProcessResponse<ProductInterface>> {
    const { name, price } = product;
    try {
      const rows = await useDatabase<ProductInterface>(
        this.sqlQueries.createProduct,
        [name, price]
      );
      return {
        status: Status.SUCCESS,
        data: rows[0],
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to add new product ${name}. The error is: ${err}`,
      };
    }
  }

  async getProductById(id: number): Promise<ProcessResponse<ProductInterface>> {
    try {
      const rows = await useDatabase<ProductInterface>(
        this.sqlQueries.getProductById,
        [id]
      );
      return {
        status: Status.SUCCESS,
        data: rows[0],
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to find product ${id}. The error is: ${err}`,
      };
    }
  }

  async updateProductById(
    id: number,
    productData: BaseProductInterface
  ): Promise<ProcessResponse<ProductInterface>> {
    const { name: newName, price } = productData;

    try {
      const rows = await useDatabase<ProductInterface>(
        this.sqlQueries.updateProductById,
        [newName, price, id]
      );
      return {
        status: Status.SUCCESS,
        data: rows[0],
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to update product ${id} with ${newName}. The error is: ${err}`,
      };
    }
  }

  async deleteProduct(id: number): Promise<ProcessResponse<ProductInterface>> {
    try {
      const rows = await useDatabase<ProductInterface>(
        this.sqlQueries.deleteProductById,
        [id]
      );
      return {
        status: Status.SUCCESS,
        data: rows[0],
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to delete product ${id}. The error is: ${err}`,
      };
    }
  }
}
