import { Request, Response } from "express";
import { OrderStore } from "../models/orders";
import { OrderProductInterface, OrderStatus } from "../types";

const orderStore = new OrderStore();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { data: orders } = await orderStore.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const products = req.body.products as unknown as OrderProductInterface[];
    const status = req.body.status as unknown as OrderStatus;
    const user_id = req.body.user_id as unknown as number;

    if (!products || !status || !user_id) {
      res.status(400);
      res.send(
        "Some required parameters are missing! eg. :products, :status, :user_id"
      );
      return false;
    }

    const { data: order } = await orderStore.createOrder({
      products,
      status,
      user_id,
    });

    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      res.status(400);
      res.send("Missing required parameter :id.");
      return false;
    }

    const { data: order } = await orderStore.getOrderById(id);
    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const products = req.body.products as unknown as OrderProductInterface[];
    const status = req.body.status as unknown as OrderStatus;
    const user_id = req.body.user_id as unknown as number;

    if (!products || !status || !user_id || !id) {
      res.status(400);
      res.send(
        "Some required parameters are missing! eg. :products, :status, :user_id, :id"
      );
      return false;
    }

    const { data: order } = await orderStore.updateOrderById(id, {
      products,
      status,
      user_id,
    });

    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      res.status(400);
      res.send("Missing required parameter :id.");
      return false;
    }

    await orderStore.deleteOrder(id);

    res.send(`Order with id ${id} successfully deleted.`);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder };
