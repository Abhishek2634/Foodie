import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  city: { type: String, required: true },
  phone: String,
  cuisine: { type: String, required: true },
  description: String,
  image: String,
  averageRating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  deliveryTime: String,
  discount: String,
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);
