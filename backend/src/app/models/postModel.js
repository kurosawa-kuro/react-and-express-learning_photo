// backend\src\app\models\postModel.js

import { db } from "../../database/prisma/prismaClient.js";

export const POSTS_PER_PAGE = 3;  // adjust this as needed

export const getPaginatedPosts = async (page, search) => {
    const posts = await db.post.findMany({
        skip: (page - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
        orderBy: {
            createdAt: 'desc',  // assuming you have a createdAt field
        },
        where: {
            OR: [
                {
                    title: {
                        contains: search,
                    },
                },
                {
                    comment: {
                        contains: search,
                    },
                },
            ],
        },
        include: {
            user: true, // Include related User
            images: true // Include related PostImage
        }
    });
    return posts;
};

export const getTotalPosts = async (search) => {
    const totalPosts = await db.post.count({
        where: {
            OR: [
                {
                    title: {
                        contains: search,
                    },
                },
                {
                    comment: {
                        contains: search,
                    },
                },
            ],
        },
    });
    return totalPosts;
};

export const createNewPost = async (postData) => {
    if (isNaN(parseInt(postData.userId))) {
        throw new Error('Invalid user ID');
    }

    const newPost = await db.post.create({
        data: {
            ...postData,
            userId: parseInt(postData.userId),
        }
    });
    return newPost;
};

export const updatePost = async (id, postData) => {
    return await db.post.update({
        where: { id },
        data: postData,
    });
};

export const getSinglePost = async (id) => {
    const post = await db.post.findFirst({
        where: { id },
        include: {
            user: true, // Include related User
            images: true,
            tags: {
                include: {
                    tag: true,
                },
            } // Include related PostImage
        }
    });

    if (!post) {
        throw new Error('Post not found');
    }

    return post;
};
