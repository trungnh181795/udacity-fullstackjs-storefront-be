import { Request, Response } from "express";
import { OrderStore } from "../models/orders";
import type { OrderProductInterface } from "../types";
import { orderStatus, Status } from "../types";
import { messages } from "../constant";

const orderStore = new OrderStore();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { data: orders, status, message } = await orderStore.getAllOrders();

    if (status === Status.FAIL) {
      return res.status(404).send(message);
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, order_status = false, user_id } = req.body;
    console.log("data product", { products, order_status, user_id });

    if (!products || !user_id) {
      return res.status(400).send(messages.controllers.order.createOrderFailed);
    }

    const {
      data: order,
      status,
      message,
    } = await orderStore.createOrder({
      products,
      status: order_status,
      user_id,
    });

    if (status === Status.FAIL) {
      return res.status(404).send(message);
    }

    res.status(201).json(order);
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

    const { data: order, status, message } = await orderStore.getOrderById(id);

    if (status === Status.FAIL) {
      return res.status(404).send(message);
    }

    return res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { products, order_status = false, user_id } = req.body;

    if (!products || !user_id || !id) {
      return res.status(400).send(messages.controllers.order.updateOrderFailed);
    }

    const { data: order, status, message } = await orderStore.updateOrderById(parseInt(id), {
      products: products as unknown as OrderProductInterface[],
      status: order_status as unknown as boolean,
      user_id: user_id as unknown as number,
    });

    if (status === Status.FAIL) {
      return res.status(404).send(message);
    }

    res.status(201).json(order);
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

    const { status, message } = await orderStore.deleteOrder(id);
    if (status === Status.FAIL) {
      return res.status(404).send(message);
    }
    return res.status(201).send(`Order with id ${id} successfully deleted.`);
  } catch (err) {
    res.status(400).json(err);
  }
};

export { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder };
