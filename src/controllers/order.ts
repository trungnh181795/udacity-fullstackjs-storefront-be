import { Request, Response } from "express";
import { OrderStore } from "../models/orders";
import { OrderProductInterface, OrderStatus, Status } from "../types";
import { messages } from "../constant";

const orderStore = new OrderStore();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { data: orders } = await orderStore.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, status, user_id } = req.body;

    if (!products || !status || !user_id) {
      return res.status(400).send(messages.controllers.order.createOrderFailed);
    }

    const { data: order } = await orderStore.createOrder({
      products,
      status,
      user_id,
    });

    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      return res
        .status(400)
        .send(messages.controllers.order.getOrderByIdFailed);
    }

    const { data: order } = await orderStore.getOrderById(id);
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id, products, status, user_id } = req.params;

    if (!products || !status || !user_id || !id) {
      return res.status(400).send(messages.controllers.order.updateOrderFailed);
    }

    const { data: order } = await orderStore.updateOrderById(parseInt(id), {
      products: products as unknown as OrderProductInterface[],
      status: status as unknown as OrderStatus,
      user_id: user_id as unknown as number,
    });

    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      return res.status(400).send(messages.controllers.order.deleteOrderFailed);
    }

    await orderStore.deleteOrder(id);

    res.send(`Order with id ${id} successfully deleted.`);
  } catch (err) {
    res.status(400).json(err);
  }
};

export { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder };
