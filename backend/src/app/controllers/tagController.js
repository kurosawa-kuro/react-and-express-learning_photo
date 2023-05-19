// Path: backend/src/app/controllers/tagController.js

import asyncHandler from "express-async-handler";
import { getAllTags, createNewTag, updateTag, deleteTag } from "../models/tagModel.js";

export const getAllTagsController = asyncHandler(async (req, res) => {
    const tags = await getAllTags();

    res.json({
        data: tags,
    });
});

export const createNewTagController = asyncHandler(async (req, res) => {
    const newTag = await createNewTag(req.body);
    res.status(201).json({ message: 'Tag created successfully', data: newTag });
});

export const updateTagController = asyncHandler(async (req, res) => {
    const tagId = parseInt(req.params.id);
    const updatedTag = await updateTag(tagId, req.body);

    res.status(200).json({ message: 'Tag updated successfully', data: updatedTag });
});

export const deleteTagController = asyncHandler(async (req, res) => {
    const tagId = parseInt(req.params.id);
    await deleteTag(tagId);

    res.status(200).json({ message: 'Tag deleted successfully' });
});
