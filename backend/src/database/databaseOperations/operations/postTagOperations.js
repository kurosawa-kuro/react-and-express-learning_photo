// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_postTag.js
import { db } from "../../prisma/prismaClient.js";

// Create PostTag
export async function createPostTag(postId, tagId) {
    if (!postId || !tagId) {
        throw new Error("Post ID, Tag ID are required");
    }

    return await db.postTag.create({
        data: {
            postId,
            tagId,
        },
    });
}

// Read All PostTags
export async function getAllPostTags() {
    return await db.postTag.findMany({
        include: {
            post: true,
            tag: true,
        },
    });
}

// Read Single PostTag by Tag ID
export async function getPostTagsByTagId(tagId) {
    if (!tagId) {
        throw new Error("Tag ID is required");
    }

    return await db.postTag.findMany({
        where: { tagId },
        include: {
            post: {
                include: { user: true },
            },
            tag: true,
        },
    });
}

// export async function getPostTagById(id) {
//     if (!id) {
//         throw new Error("PostTag ID is required");
//     }

//     return await db.postTag.findUnique({
//         where: { id },
//         include: {
//             post: {
//                 include: { user: true },
//             },
//             tag: true,
//         },
//     });
// }
