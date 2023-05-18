// Path: backend/src/app/controllers/postController.js

import asyncHandler from "express-async-handler";
import { getPaginatedPosts, createNewPost, getTotalPosts, POSTS_PER_PAGE, updatePost, getSinglePost } from "../models/postModel.js";
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
    console.log("req.body", req.body);

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

    console.log("hit updatePostController");
    console.log("req.files", req.files);
    if (isNaN(parseInt(req.params.id))) {
        throw new Error('Invalid post ID');
    }
    const postId = parseInt(req.params.id);
    // console.log("req.body.images", req.body.images);
    // console.log("req.body.images[0]", req.body.images[0].id);
    const imagesList = req.body.images;

    delete req.body.images;
    const updatedPostData = { ...req.body };
    // console.log({ updatedPostData });

    if (isNaN(parseInt(updatedPostData.userId))) {
        throw new Error('Invalid user ID');
    }
    updatedPostData.userId = parseInt(updatedPostData.userId);

    // const newPost = await createNewPost(req.body);
    const updatedPost = await updatePost(postId, updatedPostData);

    const postImages = imagesList.map((file, index) => ({
        // id: file.id,
        postId: updatedPost.id,
        imagePath: file.image,
        displayOrder: parseInt(file.displayOrder),
    }));
    console.log({ postImages });

    await updatePostImages(postId, postImages);

    res.status(200).json({ message: 'Post updated successfully', data: updatedPost, postImages });
});

export const getSinglePostController = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const post = await getSinglePost(id);

    res.json(post);
});