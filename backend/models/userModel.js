import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favoriteRestaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  favoriteFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
  
  // Loyalty Points System
  loyaltyPoints: { type: Number, default: 500 }, // Give 500 points initially
  totalPointsEarned: { type: Number, default: 500 }, // Track lifetime points earned
  achievements: [{
    id: String,
    name: String,
    unlockedAt: { type: Date, default: Date.now }
  }],
  rewardHistory: [{
    id: String,
    rewardId: String,
    rewardName: String,
    pointsCost: Number,
    redeemedAt: { type: Date, default: Date.now },
    used: { type: Boolean, default: false },
    usedAt: Date
  }]
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;

