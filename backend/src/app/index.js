// backend\src\app\index.js

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import userRoutes from "./routes/usersRoute.js";
import postRoutes from "./routes/postsRoute.js";
import tagRoutes from "./routes/tagsRoute.js";
import postTagRoutes from "./routes/postTagRoutes.js";

const __dirname = path.resolve();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'src', 'app', 'uploads')));
// Configure CORS settings to allow requests only from localhost:3000
const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
};

// Apply the CORS middleware with the specified options
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

// Set up item routes
userRoutes(app);
postRoutes(app);
tagRoutes(app);
postTagRoutes(app);

export default app;
