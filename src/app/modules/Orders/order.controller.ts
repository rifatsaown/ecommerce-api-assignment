import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import Product from '../Products/product.model';
import Order from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    const order = new Order(req.body);
    await order.save();

    res
      .status(201)
      .json(new ApiResponse(201, order, 'Order created successfully'));
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  const email = req.query.email as string;

  if (email) {
    try {
      const orders = await Order.find({ email });
      res
        .status(200)
        .json(new ApiResponse(200, orders, 'Orders fetched successfully!'));
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  } else {
    try {
      const orders = await Order.find();
      res
        .status(200)
        .json(new ApiResponse(200, orders, 'Orders fetched successfully!'));
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  }
};

export const orderServices = {
  createOrder,
  getAllOrders,
};
