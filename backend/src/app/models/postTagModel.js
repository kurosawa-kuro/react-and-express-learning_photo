// Path: backend/src/app/models/postTagModel.js

import { db } from "../../database/prisma/prismaClient.js";

export const getAllPostTags = async () => {
    const postTags = await db.postTag.findMany({
        include: {
            post: true, // include the related post for each postTag
            tag: true, // include the related tag for each postTag
        },
    });
    return postTags;
};

export const createNewPostTag = async (postTagData) => {
    const newPostTag = await db.postTag.create({
        data: postTagData,
    });
    return newPostTag;
};

export const updatePostTag = async (id, postTagData) => {
    return await db.postTag.update({
        where: { id },
        data: postTagData,
    });
};

export const deletePostTag = async (id) => {
    return await db.postTag.delete({
        where: { id },
    });
};