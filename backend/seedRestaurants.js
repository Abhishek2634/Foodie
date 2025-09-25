import mongoose from "mongoose";
import Restaurant from "./models/restaurantModel.js";
import Food from "./models/foodModel.js";
import "dotenv/config";

const sampleRestaurants = [
  {
    name: "The Golden Plate",
    address: "123 Main Street, Downtown",
    city: "New York",
    phone: "+1-555-0123",
    cuisine: "Italian",
    description: "Authentic Italian cuisine with fresh ingredients and traditional recipes. Our chefs bring the flavors of Italy to your table.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    deliveryTime: "25-35 min",
    discount: "20% OFF",
    averageRating: 4.5,
    numReviews: 127
  },
  {
    name: "Spice Garden",
    address: "456 Oak Avenue, Midtown",
    city: "New York",
    phone: "+1-555-0124",
    cuisine: "Indian",
    description: "Exotic Indian flavors with aromatic spices and rich curries. Experience the authentic taste of India.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=300&fit=crop",
    deliveryTime: "30-45 min",
    discount: "15% OFF",
    averageRating: 4.2,
    numReviews: 89
  },
  {
    name: "Ocean's Catch",
    address: "789 Harbor Drive, Harbor District",
    city: "Los Angeles",
    phone: "+1-555-0125",
    cuisine: "Seafood",
    description: "Fresh seafood and coastal cuisine with stunning ocean views. The freshest catch of the day.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop",
    deliveryTime: "20-30 min",
    discount: "25% OFF",
    averageRating: 4.7,
    numReviews: 156
  },
  {
    name: "Burger Haven",
    address: "321 Westside Blvd, Westside",
    city: "Los Angeles",
    phone: "+1-555-0126",
    cuisine: "American",
    description: "Gourmet burgers and comfort food with premium ingredients. The best burgers in town.",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop",
    deliveryTime: "15-25 min",
    discount: "10% OFF",
    averageRating: 4.3,
    numReviews: 203
  },
  {
    name: "Sakura Sushi",
    address: "654 Cherry Lane, Downtown",
    city: "Chicago",
    phone: "+1-555-0127",
    cuisine: "Japanese",
    description: "Authentic Japanese sushi and sashimi. Fresh fish and traditional preparation methods.",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop",
    deliveryTime: "35-45 min",
    discount: "30% OFF",
    averageRating: 4.8,
    numReviews: 178
  },
  {
    name: "Taco Fiesta",
    address: "987 South Street, Southside",
    city: "Chicago",
    phone: "+1-555-0128",
    cuisine: "Mexican",
    description: "Authentic Mexican tacos and traditional dishes. Spicy flavors and fresh ingredients.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop",
    deliveryTime: "20-30 min",
    discount: "20% OFF",
    averageRating: 4.1,
    numReviews: 95
  },
  {
    name: "Pho Palace",
    address: "147 Rice Street, Chinatown",
    city: "Houston",
    phone: "+1-555-0129",
    cuisine: "Vietnamese",
    description: "Authentic Vietnamese pho and traditional dishes. Rich broths and fresh herbs.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=300&fit=crop",
    deliveryTime: "25-35 min",
    discount: "15% OFF",
    averageRating: 4.4,
    numReviews: 134
  },
  {
    name: "BBQ Pit",
    address: "258 Smoke Road, Northside",
    city: "Houston",
    phone: "+1-555-0130",
    cuisine: "BBQ",
    description: "Texas-style BBQ with slow-smoked meats and traditional sides. Finger-licking good!",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=300&fit=crop",
    deliveryTime: "40-50 min",
    discount: "25% OFF",
    averageRating: 4.6,
    numReviews: 167
  },
  {
    name: "Pizza Palace",
    address: "369 Cheese Avenue, Downtown",
    city: "Phoenix",
    phone: "+1-555-0131",
    cuisine: "Italian",
    description: "New York-style pizza with fresh mozzarella and homemade sauce. Crispy crust and gooey cheese.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop",
    deliveryTime: "30-40 min",
    discount: "20% OFF",
    averageRating: 4.3,
    numReviews: 112
  },
  {
    name: "Thai Spice",
    address: "741 Spice Lane, Eastside",
    city: "Phoenix",
    phone: "+1-555-0132",
    cuisine: "Thai",
    description: "Authentic Thai cuisine with bold flavors and aromatic spices. From mild to extra spicy.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=300&fit=crop",
    deliveryTime: "25-35 min",
    discount: "15% OFF",
    averageRating: 4.5,
    numReviews: 98
  },
  // Indian Restaurants
  {
    name: "Taj Mahal Restaurant",
    address: "123 Marine Drive, Colaba",
    city: "Mumbai",
    phone: "+91-22-555-0123",
    cuisine: "Indian",
    description: "Authentic Indian cuisine with a modern twist. Experience the rich flavors of India in a luxurious setting.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=300&fit=crop",
    deliveryTime: "30-45 min",
    discount: "25% OFF",
    averageRating: 4.6,
    numReviews: 234
  },
  {
    name: "Delhi Darbar",
    address: "456 Connaught Place, Central Delhi",
    city: "Delhi",
    phone: "+91-11-555-0124",
    cuisine: "North Indian",
    description: "Traditional North Indian cuisine with authentic recipes passed down through generations.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=300&fit=crop",
    deliveryTime: "25-35 min",
    discount: "20% OFF",
    averageRating: 4.4,
    numReviews: 189
  },
  {
    name: "Bangalore Biryani House",
    address: "789 Brigade Road, MG Road",
    city: "Bangalore",
    phone: "+91-80-555-0125",
    cuisine: "South Indian",
    description: "Famous for authentic South Indian biryani and traditional Karnataka cuisine.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=300&fit=crop",
    deliveryTime: "35-50 min",
    discount: "15% OFF",
    averageRating: 4.7,
    numReviews: 156
  },
  {
    name: "Hyderabad House",
    address: "321 Banjara Hills, Hyderabad",
    city: "Hyderabad",
    phone: "+91-40-555-0126",
    cuisine: "Hyderabadi",
    description: "Famous Hyderabadi biryani and authentic Telangana cuisine with rich spices.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=300&fit=crop",
    deliveryTime: "30-45 min",
    discount: "30% OFF",
    averageRating: 4.8,
    numReviews: 267
  },
  {
    name: "Chennai Curry Corner",
    address: "654 T Nagar, Chennai",
    city: "Chennai",
    phone: "+91-44-555-0127",
    cuisine: "Tamil Nadu",
    description: "Authentic Tamil Nadu cuisine with traditional recipes and fresh ingredients.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=300&fit=crop",
    deliveryTime: "25-40 min",
    discount: "20% OFF",
    averageRating: 4.3,
    numReviews: 145
  }
];

const sampleFoods = [
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "Pizza",
    averageRating: 4.5,
    numReviews: 45
  },
  {
    name: "Chicken Tikka Masala",
    description: "Tender chicken in creamy tomato sauce with aromatic spices",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    category: "Curry",
    averageRating: 4.3,
    numReviews: 38
  },
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon grilled to perfection with herbs",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    category: "Seafood",
    averageRating: 4.7,
    numReviews: 52
  },
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "Burger",
    averageRating: 4.2,
    numReviews: 67
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Restaurant.deleteMany({});
    await Food.deleteMany({});
    
    console.log("Cleared existing data");
    
    // Insert restaurants
    const createdRestaurants = await Restaurant.insertMany(sampleRestaurants);
    console.log(`Inserted ${createdRestaurants.length} restaurants`);
    
    // Insert foods for each restaurant
    for (let i = 0; i < createdRestaurants.length; i++) {
      const restaurant = createdRestaurants[i];
      const foodsForRestaurant = sampleFoods.map(food => ({
        ...food,
        restaurantId: restaurant._id
      }));
      
      await Food.insertMany(foodsForRestaurant);
    }
    
    console.log(`Inserted foods for ${createdRestaurants.length} restaurants`);
    
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
