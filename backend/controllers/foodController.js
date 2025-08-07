// foodController.js
import asyncHandler from '../utils/asyncHandler.js';
import Food from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  console.log("Parsed restaurantId:", body.restaurantId);
  console.log("Type:", typeof body.restaurantId);

  const newFood = new Food({
    name: body.name,
    price: body.price,
    description: body.description,
    category: body.category,
    restaurantId: body.restaurantId,
    image: req.file?.filename,
  });

  await newFood.save();

  res.status(201).json({ success: true, food: newFood });
});

// Get food by restaurant
const getFoodByRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const foodList = await Food.find({ restaurantId });
  res.status(200).json({ success: true, food: foodList });
});

// Remove food item
const removeFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.body.id);
  fs.unlink(`uploads/${food.image}`, () => {});
  await Food.findByIdAndDelete(req.body.id);
  res.json({ success: true, message: "Food item removed" });
});

// ✅ Export all at once (no duplicates)
export { addFood, getFoodByRestaurant, removeFood };
