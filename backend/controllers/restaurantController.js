import Restaurant from "../models/restaurantModel.js";
import asyncHandler from '../utils/asyncHandler.js';

export const addRestaurant = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  const restaurant = new Restaurant({ name, location });
  await restaurant.save();
  res.status(201).json(restaurant);
});
