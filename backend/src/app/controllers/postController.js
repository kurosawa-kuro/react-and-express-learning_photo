// Path: backend/src/app/controllers/postController.js

import asyncHandler from "express-async-handler";
import { getPaginatedPosts, createNewPost, getTotalPosts, POSTS_PER_PAGE } from "../models/postModel.js";

export const getAllPostsController = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const search = req.query.search || "";

    const posts = await getPaginatedPosts(page, search);
    const totalPosts = await getTotalPosts(search);

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    res.json({
        currentPage: page,
        totalPages: totalPages,
        itemsPerPage: POSTS_PER_PAGE,
        data: posts,
    });
});

export const createNewPostController = asyncHandler(async (req, res) => {

    const newPostData = {
        ...req.body,
        image: req.file.filename
    };
    const newPost = await createNewPost(newPostData);
    res.status(201).json(newPost);
});
