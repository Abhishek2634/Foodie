import Restaurant from "../models/restaurantModel.js";
import Food from "../models/foodModel.js";
import Review from "../models/reviewModel.js";

export const addRestaurant = async (req, res) => {
  try {
    const { name, address, city, phone, cuisine, description, image, deliveryTime, discount } = req.body;
    const restaurant = new Restaurant({ 
      name, 
      address, 
      city, 
      phone, 
      cuisine, 
      description, 
      image, 
      deliveryTime, 
      discount 
    });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get best-rated restaurants for a city
export const getBestRatedRestaurants = async (req, res) => {
  try {
    const { city, limit = 10 } = req.query;
    
    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }

    // Find restaurants in the specified city, sorted by rating (descending)
    const restaurants = await Restaurant.find({
      city: { $regex: new RegExp(city, 'i') }, // Case-insensitive search
      isActive: true,
      averageRating: { $gt: 0 } // Only restaurants with ratings
    })
    .sort({ averageRating: -1, numReviews: -1 }) // Sort by rating first, then by number of reviews
    .limit(parseInt(limit))
    .select('name address city cuisine description image averageRating numReviews deliveryTime discount');

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all restaurants in a city
export const getRestaurantsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    
    const restaurants = await Restaurant.find({
      city: { $regex: new RegExp(city, 'i') },
      isActive: true
    })
    .sort({ averageRating: -1 })
    .select('name address city cuisine description image averageRating numReviews deliveryTime discount');

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get restaurant details with foods
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Get foods for this restaurant
    const foods = await Food.find({ restaurantId: id })
      .select('name description price image category averageRating numReviews');

    res.status(200).json({
      success: true,
      data: {
        restaurant,
        foods
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update restaurant rating (called when a review is added)
export const updateRestaurantRating = async (restaurantId) => {
  try {
    // Get all foods for this restaurant
    const foods = await Food.find({ restaurantId });
    
    if (foods.length === 0) return;

    // Calculate average rating from all foods
    let totalRating = 0;
    let totalReviews = 0;

    for (const food of foods) {
      totalRating += food.averageRating * food.numReviews;
      totalReviews += food.numReviews;
    }

    const newAverageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    // Update restaurant rating
    await Restaurant.findByIdAndUpdate(restaurantId, {
      averageRating: newAverageRating,
      numReviews: totalReviews
    });
  } catch (error) {
    console.error('Error updating restaurant rating:', error);
  }
};
