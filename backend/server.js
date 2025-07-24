import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

import subscribeRouter from './routes/subscribeRoute.js'; // default import
import 'dotenv/config';

import authRouter from './routes/authRoute.js';
import 'dotenv/config';
import favoritesRoute from './routes/favoriteRoute.js';
import userRoute from './routes/userRoutes.js'

import dotenv from 'dotenv';
dotenv.config();


// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));


// db connection
await connectDB();

// api endpoints

app.use("/api/food", foodRouter);
app.use("/api/subscribe", subscribeRouter); // added

app.use("/api/food",foodRouter);
app.use('/api/favorites', favoritesRoute);
app.use('/api/users', userRoute);
app.use("/api/auth", authRouter);


app.get('/', (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
