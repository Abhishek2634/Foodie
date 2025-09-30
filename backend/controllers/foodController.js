// foodController.js

import Food from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
  try {
    const body = { ...req.body };
    console.log("Parsed restaurantId:", body.restaurantId);
    console.log("Type:", typeof body.restaurantId);

    const newFood = new Food({
      name: body.name,
      price: body.price,
      description: body.description,
      category: body.category,
      foodType: body.foodType || 'main', // Default to 'main' if not provided
      restaurantId: body.restaurantId,
      image: req.file?.filename,
    });

    await newFood.save();

    res.status(201).json({ success: true, food: newFood });
  } catch (error) {
    console.error("❌ Add food error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get food by restaurant
const getFoodByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foodList = await Food.find({ restaurantId });
    res.status(200).json({ success: true, food: foodList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing food item" });
  }
};

// Get all available food types/categories
const getFoodTypes = async (req, res) => {
  try {
    const foodTypes = ['appetizer', 'main', 'dessert', 'beverage', 'snack', 'side'];
    res.status(200).json({ success: true, foodTypes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get foods by food type
const getFoodsByType = async (req, res) => {
  try {
    const { foodType } = req.params;
    const { restaurantId } = req.query;
    
    let query = { foodType };
    if (restaurantId) {
      query.restaurantId = restaurantId;
    }
    
    const foods = await Food.find(query).populate('restaurantId', 'name');
    res.status(200).json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all foods with optional filtering
const getAllFoods = async (req, res) => {
  try {
    const { foodType, category, restaurantId } = req.query;
    let query = {};
    
    if (foodType) query.foodType = foodType;
    if (category) query.category = category;
    if (restaurantId) query.restaurantId = restaurantId;
    
    const foods = await Food.find(query).populate('restaurantId', 'name');
    res.status(200).json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Export all at once (no duplicates)
export { addFood, getFoodByRestaurant, removeFood, getFoodTypes, getFoodsByType, getAllFoods };
