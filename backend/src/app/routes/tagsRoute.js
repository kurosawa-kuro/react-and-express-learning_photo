// Path: backend/src/app/routes/tagsRoute.js

import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getAllTagsController,
    createNewTagController,
    updateTagController,
    deleteTagController
} from "../controllers/tagController.js";

const tagRoutes = (app) => {
    // Get all tags
    app.get("/tags", authMiddleware, asyncHandler(getAllTagsController));

    // Create a new tag
    app.post("/tags", authMiddleware, asyncHandler(createNewTagController));

    // Update a tag
    app.put("/tags/:id", authMiddleware, asyncHandler(updateTagController));

    // Delete a tag
    app.delete("/tags/:id", authMiddleware, asyncHandler(deleteTagController));
};

export default tagRoutes;
