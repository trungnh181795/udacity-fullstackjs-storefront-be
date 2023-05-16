import {
  BaseOrderInterface,
  OrderInterface,
  OrderProductInterface,
  ProcessResponse,
  Status,
  UserInterface,
} from "../types";
import { useDatabase } from "../utils/use-database";

export class OrderStore {
  private readonly sqlQueries = {
    getAllOrders: "SELECT * FROM orders",
    getUserById: "SELECT * FROM users WHERE id=($1)",
    getOrderProductsById:
      "SELECT product_id, quantity FROM order_products WHERE order_id=($1)",
    createOrder:
      "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *",
    createOrderProducts:
      "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity",
    getOrderById: "SELECT * FROM orders WHERE id=($1)",
    updateOrderById: "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
    updateOrderProducts:
      "UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity",
    deleteOrderById: "DELETE FROM orders WHERE id=($1)",
    deleteOrderProducts: "DELETE FROM order_products WHERE order_id=($1)",
  };

  async getAllOrders(): Promise<ProcessResponse<OrderInterface[]>> {
    try {
      const rows = await useDatabase<OrderInterface>(
        this.sqlQueries.getAllOrders
      );

      const records: OrderInterface[] = [];
      const orders = [...rows];
      
      if (!orders || rows.length === 0) {
        return {
          status: Status.FAIL,
          message: 'No orders found',
        };
      }
      
      for (const order of orders) {
        const rows = await useDatabase<OrderProductInterface>(
          this.sqlQueries.getOrderProductsById,
          [order.id]
        );

        records.push({
          ...order,
          products: rows,
        });
      }

      return {
        status: Status.SUCCESS,
        data: records,
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to get orders. The error is: ${err}`,
      };
    }
  }

  async createOrder(
    order: BaseOrderInterface
  ): Promise<ProcessResponse<OrderInterface>> {
    const { products, status, user_id } = order;

    try {
      const users = await useDatabase<UserInterface>(this.sqlQueries.getUserById, [user_id]);

      if (!users || users.length === 0) {
        return {
          status: Status.FAIL,
          message: `No user found for ${user_id}`,
        };
      }

      const rows = await useDatabase<OrderInterface>(
        this.sqlQueries.createOrder,
        [user_id, status]
      );

      const order = rows[0];
      const orderProducts = [];

      for (const product of products) {
        const { product_id, quantity } = product;
        const rows = await useDatabase<OrderProductInterface>(
          this.sqlQueries.createOrderProducts,
          [order.id, product_id, quantity]
        );

        orderProducts.push(rows[0]);
      }

      if (orderProducts.length === 0) {
        return {
          status: Status.FAIL,
          message: `Products cannot be empty`,
        }
      }

      return {
        status: Status.SUCCESS,
        data: {
          ...order,
          products: orderProducts,
        },
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to add new order for user ${user_id}. The error is: ${err}`,
      };
    }
  }

  async getOrderById(id: number): Promise<ProcessResponse<OrderInterface>> {
    try {
      const rows = await useDatabase<OrderInterface>(
        this.sqlQueries.getOrderById,
        [id]
      );
      const order = rows[0];
       
      if (!order) {
        return {
          status: Status.FAIL,
          message: `No order found for ${id}`,
        }
      }

      const orderProductRows = await useDatabase<OrderProductInterface>(
        this.sqlQueries.getOrderProductsById,
        [id]
      );
      return {
        status: Status.SUCCESS,
        data: {
          ...order,
          products: orderProductRows,
        },
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to find order ${id}. The error is: ${err}`,
      };
    }
  }

  async updateOrderById(
    id: number,
    orderData: BaseOrderInterface
  ): Promise<ProcessResponse<OrderInterface>> {
    const { products, status, user_id } = orderData;

    const selectedOrder = await useDatabase<OrderInterface>(this.sqlQueries.getOrderById, [id])

    if (!selectedOrder || selectedOrder.length === 0) {
      return {
        status: Status.FAIL,
        message: `Order ${id} not found`
      }
    }

    try {
      const rows = await useDatabase<OrderInterface>(
        this.sqlQueries.updateOrderById,
        [status, id]
      );
      const order = rows[0];
      const orderProducts = [];

      for (const product of products) {
        const rows = await useDatabase<OrderProductInterface>(
          this.sqlQueries.updateOrderProducts,
          [product.product_id, product.quantity, order.id]
        );
        orderProducts.push(rows[0]);
      }

      return {
        status: Status.SUCCESS,
        data: {
          ...order,
          products: orderProducts,
        },
      };
    } catch (err) {
      throw new Error(`Fail to update order for user ${user_id}. The erro is: ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<ProcessResponse<OrderInterface>> {
    try {
      const rows = await useDatabase<OrderInterface>(this.sqlQueries.getOrderById, [id]);

      await useDatabase<OrderInterface>(this.sqlQueries.deleteOrderProducts, [
        id,
      ]);
      await useDatabase<OrderInterface>(
        this.sqlQueries.deleteOrderById,
        [id]
      );
      const order = rows[0];

      if (!order) {
        return {
          status: Status.FAIL,
          message: `No order found for ${id}`,
        }
      }

      return {
        status: Status.SUCCESS,
        message: `Delelted order ${id} successfully!`,
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to delete order ${id}. The error is: ${err}`,
      };
    }
  }
}
