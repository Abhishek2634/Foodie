// foodController.js

import Food from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

// Add food item
const addFood = async (req, res) => {
  try {
    const {name, price, description, category, restaurantId} = req.body;
    if(!name || !price || !description || !category || !restaurantId){
      return res.status(400).json({success: false, message: "All fields are required"});
    }
    console.log("Parsed restaurantId:", restaurantId);
    console.log("Type:", typeof restaurantId);

    const newFood = new Food({
      name:name,
      price:price,
      description:description,
      category:category,
      restaurantId:restaurantId,
      image: req.file?.filename,
    });

    await newFood.save();

    res.status(201).json({ success: true, food: newFood });
  } catch (error) {
    console.error("❌ Add food error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get food by restaurant
const getFoodByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if(!restaurantId){
      return res.status(400).json({success: false, message: "Restaurant ID is required"});
    }
    const foodList = await Food.find({ restaurantId });
    res.status(200).json({ success: true, food: foodList });
  } catch (error) {
    console.error("❌ Get food by restaurant error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    if(!food){
      return res.status(404).json({success: false, message: "Food not found"});
    }
    if(food.image){
      try{
        const imagePath = path.join(process.cwd(), 'uploads', food.image);
        if(fs.existsSync(imagePath)){
          fs.unlinkSync(imagePath);
          console.log("Image deleted successfully");
        }
      }
      catch(error){
        console.error("❌ Error deleting image:", error.message);
      }
    }

    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item removed" });
  } catch (error) {
    console.error("❌ Remove food error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Export all at once (no duplicates)
export { addFood, getFoodByRestaurant, removeFood };
