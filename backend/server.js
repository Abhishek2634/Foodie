import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import subscribeRouter from './routes/subscribeRoute.js'; // default import
import 'dotenv/config';

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
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/subscribe", subscribeRouter); // added

app.get('/', (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
