import express from "express";
import { 
  addRestaurant, 
  getBestRatedRestaurants, 
  getRestaurantsByCity, 
  getRestaurantById 
} from "../controllers/restaurantController.js";

const router = express.Router();

// Add a new restaurant
router.post("/add", addRestaurant);

// Get best-rated restaurants for a city (for new users)
router.get("/best-rated", getBestRatedRestaurants);

// Get all restaurants in a city
router.get("/city/:city", getRestaurantsByCity);

// Get restaurant details with foods
router.get("/:id", getRestaurantById);

export default router;
