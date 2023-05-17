// Path: backend/src/app/controllers/postController.js

import asyncHandler from "express-async-handler";
import { getPaginatedPosts, createNewPost, getTotalPosts, POSTS_PER_PAGE, updatePost } from "../models/postModel.js";
import { createPostImages, updatePostImages } from "../models/postImageModel.js";

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
    console.log("hit createNewPostController");
    console.log("req.files", req.files);

    const newPost = await createNewPost(req.body);
    const postImages = req.files.map((file, index) => ({
        postId: newPost.id,
        imagePath: file.filename,
        displayOrder: index + 1,
    }));

    await createPostImages(postImages);

    res.status(201).json({ message: 'Post created successfully', data: newPost });
});

export const updatePostController = asyncHandler(async (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        throw new Error('Invalid post ID');
    }
    const postId = parseInt(req.params.id);
    const updatedPostData = { ...req.body };

    if (isNaN(parseInt(updatedPostData.userId))) {
        throw new Error('Invalid user ID');
    }
    updatedPostData.userId = parseInt(updatedPostData.userId);

    const updatedPost = await updatePost(postId, updatedPostData);

    const postImages = req.files.map((file, index) => ({
        postId: updatedPost.id,
        imagePath: file.filename,
        displayOrder: index + 1,
    }));

    await updatePostImages(postId, postImages);

    res.status(200).json({ message: 'Post updated successfully', data: updatedPost, postImages });
});
