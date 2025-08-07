import Cart from "../models/cartModel.js";
import asyncHandler from '../utils/asyncHandler.js';

export const addToCart = asyncHandler(async (req, res) => {
  const { foodId, quantity, restaurantId } = req.body;
  const userId = req.user._id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [{ foodId, quantity, restaurantId }] });
  } else {
    const itemIndex = cart.items.findIndex(
      item => item.foodId.toString() === foodId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ foodId, quantity, restaurantId });
    }
  }

  await cart.save();
  res.status(200).json(await cart.populate("items.foodId items.restaurantId"));
});

export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId }).populate("items.foodId items.restaurantId");

  if (!cart) {
    return res.status(200).json({ items: [] });
  }

  res.status(200).json(cart);
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { foodId, quantity } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((item) => item.foodId.toString() === foodId);
  if (!item) return res.status(404).json({ message: "Item not in cart" });

  item.quantity = quantity;
  await cart.save();

  res.status(200).json({ message: "Quantity updated", cart });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { foodId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((item) => item.foodId.toString() !== foodId);
  await cart.save();

  res.status(200).json({ message: "Item removed", cart });
});

export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = [];
  await cart.save();

  res.status(200).json({ message: "Cart cleared", cart });
});
