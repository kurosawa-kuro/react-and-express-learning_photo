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

export const updatePostTag = async (postId, tagsList) => {
    // 先に既存のデータを削除してから、新規追加した方が実装が楽
    // postIdを指定してPostTagを削除
    await db.postTag.deleteMany({
        where: { postId },
    });

    // 新規にPostTagを追加
    const newPostTags = tagsList.map((tagId) => {
        return {
            postId,
            tagId: parseInt(tagId),
        };
    });

    return await db.postTag.createMany({
        data: newPostTags,
    });
};





export const deletePostTag = async (id) => {
    return await db.postTag.delete({
        where: { id },
    });
};