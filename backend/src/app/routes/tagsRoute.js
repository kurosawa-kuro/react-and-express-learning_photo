// Path: backend/src/app/routes/tagsRoute.js

import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getAllTagsController,
    getSingleTagController,
    createNewTagController,
    updateTagController,
    deleteTagController
} from "../controllers/tagController.js";

const tagRoutes = (app) => {
    // Get all tags
    app.get("/tags", authMiddleware, asyncHandler(getAllTagsController));

    app.get("/tags/:id", authMiddleware, asyncHandler(getSingleTagController));

    // Create a new tag
    app.post("/tags", authMiddleware, asyncHandler(createNewTagController));

    // Update a tag
    app.put("/tags/:id", authMiddleware, asyncHandler(updateTagController));

    // Delete a tag
    app.delete("/tags/:id", authMiddleware, asyncHandler(deleteTagController));
};

export default tagRoutes;
