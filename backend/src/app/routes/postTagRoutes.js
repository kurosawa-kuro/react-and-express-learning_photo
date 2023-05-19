// Path: backend/src/app/routes/postTagRoutes.js

import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getAllPostTagsController,
    createNewPostTagController,
    updatePostTagController,
    deletePostTagController
} from "../controllers/postTagController.js";

const postTagRoutes = (app) => {
    // Get all post tags
    app.get("/postTags", authMiddleware, asyncHandler(getAllPostTagsController));

    // Create a new post tag
    app.post("/postTags", authMiddleware, asyncHandler(createNewPostTagController));

    // Update a post tag
    app.put("/postTags/:id", authMiddleware, asyncHandler(updatePostTagController));

    // Delete a post tag
    app.delete("/postTags/:id", authMiddleware, asyncHandler(deletePostTagController));
};

export default postTagRoutes;
