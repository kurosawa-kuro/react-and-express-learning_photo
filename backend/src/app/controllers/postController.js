// backend\src\app\controllers\postController.js

import asyncHandler from "express-async-handler";
import { getPaginatedPosts, createNewPost, getTotalPosts, POSTS_PER_PAGE, updatePost, getSinglePost } from "../models/postModel.js";
import { createPostImages, updatePostImages } from "../models/postImageModel.js";
import { createNewPostTag, updatePostTag, deletePostTag } from "../models/postTagModel.js";

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

// Helper function to create Post Images
const createPostImagesForNewPost = async (files, postId) => {
    const postImages = files.map((file, index) => ({
        postId: postId,
        imagePath: file.filename,
        displayOrder: index + 1,
    }));

    await createPostImages(postImages);
};

// Helper function to create Post Tags
const createPostTagsForNewPost = async (tags, postId) => {
    const postTags = tags.map((tag) => ({
        postId: postId,
        tagId: parseInt(tag),
    }));

    await Promise.all(postTags.map((postTag) => createNewPostTag(postTag)));
};

export const createNewPostController = asyncHandler(async (req, res) => {
    console.log("--------- createNewPostController ----------")
    console.log("--------- req.body ----------", req.body)
    console.log("--------- req.files ----------", req.files)
    console.log("--------- req.user ----------", req.user)
    // Extract and remove tags from the request body
    const { tags: rawTags, userId, ...postData } = req.body;

    // Ensure tags is an array
    const tags = Array.isArray(rawTags) ? rawTags : [rawTags];
    console.log("--------- rawTags ----------", rawTags)
    console.log("--------- postData ----------", postData)
    postData.userId = req.user.id;
    console.log("--------- postData.userId ----------", postData.userId)
    // Create the new post
    const newPost = await createNewPost({ ...postData });
    console.log("◇◇◇ newPost ◇◇◇", newPost)

    // Create the array of image data and save them
    await createPostImagesForNewPost(req.files, newPost.id);

    // Create the array of tag data and save them
    if (tags[0] !== undefined) {
        await createPostTagsForNewPost(tags, newPost.id);
    }

    // Return the successful response
    res.status(201).json({ message: 'Post created successfully', data: newPost });
});


export const updatePostController = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id);

    if (isNaN(postId)) {
        throw new Error('Invalid post ID');
    }

    const { images: imagesList, tags: tagsList, ...updatedPostData } = req.body;

    if (isNaN(parseInt(updatedPostData.userId))) {
        throw new Error('Invalid user ID');
    }

    updatedPostData.userId = parseInt(updatedPostData.userId);

    const updatedPost = await updatePost(postId, updatedPostData);

    const postImages = imagesList.map((file) => ({
        postId: updatedPost.id,
        imagePath: file.image,
        displayOrder: parseInt(file.displayOrder),
    }));

    await updatePostImages(postId, postImages);

    // Create the array of tag data and save them
    if (!tagsList) {
        await deletePostTag(postId);
    } else {
        await updatePostTag(postId, tagsList)
    }

    res.status(200).json({ message: 'Post updated successfully', data: updatedPost, postImages, tagsList });
});



export const getSinglePostController = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const post = await getSinglePost(id);

    res.json(post);
});