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
const port = 4000;

// middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup for cookies
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5174",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// db connection
await connectDB();

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
  res.send("api working");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
