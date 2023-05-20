// backend\src\app\models\tagModel.js

import { db } from "../../database/prisma/prismaClient.js";

export const getAllTags = async () => {
    const tags = await db.tag.findMany({
        include: {
            posts: {
                include: {
                    post: true,  // This will include the Post data for each PostTag
                },
            },
        },
    });
    return tags;
};


export const createNewTag = async (tagData) => {
    const newTag = await db.tag.create({
        data: tagData,
    });
    return newTag;
};

export const updateTag = async (id, tagData) => {
    return await db.tag.update({
        where: { id },
        data: tagData,
    });
};

export const deleteTag = async (id) => {
    return await db.tag.delete({
        where: { id },
    });
};

export const getSingleTag = async (id) => {
    const tag = await db.tag.findUnique({
        where: { id },
        include: {
            posts: {
                include: {
                    post: true,  // This will include the Post data for each PostTag
                },
            },
        },
    });
    return tag;
};