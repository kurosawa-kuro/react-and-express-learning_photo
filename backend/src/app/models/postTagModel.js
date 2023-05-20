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
    console.log(postTagData);
    console.log("postTagData.tagId", postTagData.tagId);
    const newPostTag = await db.postTag.create({
        data: postTagData,
    });
    return newPostTag;
};

export const updatePostTag = async (postId, tagsList) => {
    const deleteOldTags = db.postTag.deleteMany({
        where: { postId },
    });

    const newPostTags = tagsList.map(tagId => ({
        postId,
        tagId: parseInt(tagId),
    }));

    const createNewTags = db.postTag.createMany({
        data: newPostTags,
    });

    await db.$transaction([deleteOldTags, createNewTags]);

};

export const deletePostTag = async (postId) => {
    await db.postTag.deleteMany({
        where: { postId },
    });
};