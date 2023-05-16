// Path: backend/src/app/routes/postsRoute.js

import asyncHandler from "express-async-handler";
import upload from "../middlewares/uploadMiddelware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllPostsController, createNewPostController } from "../controllers/postController.js";

const postRoutes = (app) => {
    // Get all posts
    // Add the authMiddleware to the route to ensure only authenticated users can get posts
    app.get("/posts", authMiddleware, asyncHandler(getAllPostsController));

    // Create a new post
    app.post("/posts", authMiddleware, upload.single('image'), asyncHandler(createNewPostController));
};


export default postRoutes;
