// path backend\src\app\models\postImageModel.js

import { db } from "../../database/prisma/prismaClient.js";

export const createPostImages = async (postImages) => {
    return await db.postImage.createMany({
        data: postImages,
    });
};
