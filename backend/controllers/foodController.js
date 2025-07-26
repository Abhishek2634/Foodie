import foodModel from '../models/foodModel.js';
import fs from 'fs';

// add food item
const addFood = async (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.json({ success: false, message: "No image file uploaded" });
    }

    let image_filename = req.file.filename; // <-- CORRECTED LINE

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error saving food item" });
    }
};


const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food items" });
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food item removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food item" });
    }
}

export {addFood, listFood, removeFood};