// foodController.js

import Food from "../models/foodModel.js";
import fs from 'fs';
import path from "path";  


// Add food item
const addFood = async (req, res) => {
  try {
    //Destructure directly from req.body for cleaner code
    const { name, price, description, category, restaurantId } = req.body;

    // Added validation for required fields
    if (!name || !price || !restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and restaurantId are required",
      });
    }

    // Handles cases where no image is uploaded)
    const image = req.file?.filename;

    // Use Food.create directly instead of new + save
    const newFood = await Food.create({
      name,
      price,
      description,
      category,
      restaurantId,
      image,
    });
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
    //Validate required parameters
    if (!restaurantId) {
      return res
        .status(400)
        .json({ success: false, message: "restaurantId is required" });
    }
    const foodList = await Food.find({ restaurantId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, food: foodList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    // Validate input ID
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Food ID is required" });
    }

    // Check if food exists before proceeding
    const food = await Food.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    if (food.image) {
      const filePath = path.join("uploads", food.image);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("⚠️ Failed to delete image:", err.message);
      });
    }
    await Food.findByIdAndDelete(id);
    res.json({ success: true, message: "Food item removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Export all at once (no duplicates)
export { addFood, getFoodByRestaurant, removeFood };
