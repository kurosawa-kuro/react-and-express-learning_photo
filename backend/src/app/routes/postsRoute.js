// Path: backend/src/app/routes/postsRoute.js

import asyncHandler from "express-async-handler";
import upload from "../middlewares/uploadMiddelware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllPostsController, createNewPostController, getSinglePostController, updatePostController } from "../controllers/postController.js";

const postRoutes = (app) => {
    // Get all posts
    // Add the authMiddleware to the route to ensure only authenticated users can get posts
    app.get("/posts", authMiddleware, asyncHandler(getAllPostsController));

    // Create a new post with multiple images
    app.post("/posts", authMiddleware, upload.array('images', 10), asyncHandler(createNewPostController));

    app.get("/posts/:id", authMiddleware, asyncHandler(getSinglePostController));

    // Update a post with multiple images
    app.put("/posts/:id", authMiddleware, upload.array('images', 10), asyncHandler(updatePostController));
};


export default postRoutes;
