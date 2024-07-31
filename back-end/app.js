import express from 'express';
import { connectDB } from './config/connectToDB.js';
import 'dotenv/config';
import { routerAuth } from './routes/authRoute.js';
import { routerUsers } from './routes/usersRoute.js';
import { routerPosts } from './routes/postRoute.js';
import { routerComments } from './routes/commentRoute.js';
import { routerCategory } from './routes/categoriesRoute.js';
import { routerAdmin } from './routes/adminRoute.js';
import { errorHandler, notFound } from './middlewares/error.js';
import cors from 'cors';

// Connect to DB
connectDB();

// Init app
const app = express();

// Middlewares
app.use(express.json());

// Cors policy
app.use(cors({
  origin: "http://localhost:3000"
}))

// Routes
app.use('/api/auth', routerAuth);
app.use('/api/users', routerUsers);
app.use('/api/posts', routerPosts);
app.use('/api/comments', routerComments);
app.use('/api/categories', routerCategory);
app.use('/admin-dashboard', routerAdmin);

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT | 8000;
app.listen(PORT, () => {
  console.log(`Server is running in ${ process.env.NODE_ENV } mode on port ${ PORT }`);
})
