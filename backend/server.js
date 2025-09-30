import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoute from "./routes/paymentRoute.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup for cookies
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // frontend URLs
  credentials: true // allow cookies to be sent
}));

// db connection
try {
  await connectDB();
} catch (error) {
  console.log('Database connection failed:', error.message);
}

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 

app.get("/", (req, res) => {
  res.json({ 
    message: "Foodie API is working!", 
    status: "success"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
