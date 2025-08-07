import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import asyncHandler from '../utils/asyncHandler.js';

export const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId }).populate("items.foodId items.restaurantId");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const totalAmount = cart.items.reduce(
    (acc, item) => acc + item.foodId.price * item.quantity,
    0
  );

  const order = new Order({
    userId,
    items: cart.items,
    totalAmount
  });

  await order.save();
  await Cart.findOneAndDelete({ userId });

  res.status(201).json(await order.populate("items.foodId items.restaurantId"));
});

export const getOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ userId }).populate("items.foodId items.restaurantId");
  res.status(200).json(orders);
});
