import express from 'express';
import { connectDB } from './config/connectToDB.js';
import 'dotenv/config';
import { router } from './routes/authRoute.js';

// Connect to DB
connectDB();

// Init app
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', router);

// Running the server
const PORT = process.env.PORT | 8000;
app.listen(PORT, () => {
  console.log(`Server is running in ${ process.env.NODE_ENV } mode on port ${ PORT }`);
})
