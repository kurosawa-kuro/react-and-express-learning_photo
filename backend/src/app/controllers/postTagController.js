// Path: backend/src/app/controllers/postTagController.js

import asyncHandler from "express-async-handler";
import { getAllPostTags, createNewPostTag, updatePostTag, deletePostTag } from "../models/postTagModel.js";

export const getAllPostTagsController = asyncHandler(async (req, res) => {
    const postTags = await getAllPostTags();

    res.json({
        data: postTags,
    });
});

export const createNewPostTagController = asyncHandler(async (req, res) => {
    const newPostTag = await createNewPostTag(req.body);
    res.status(201).json({ message: 'Post tag created successfully', data: newPostTag });
});

export const updatePostTagController = asyncHandler(async (req, res) => {
    const postTagId = parseInt(req.params.id);
    const updatedPostTag = await updatePostTag(postTagId, req.body);

    res.status(200).json({ message: 'Post tag updated successfully', data: updatedPostTag });
});

export const deletePostTagController = asyncHandler(async (req, res) => {
    const postTagId = parseInt(req.params.id);
    await deletePostTag(postTagId);

    res.status(200).json({ message: 'Post tag deleted successfully' });
});
