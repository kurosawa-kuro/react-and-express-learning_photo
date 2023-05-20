// backend\src\app\models\postImageModel.js

import { db } from "../../database/prisma/prismaClient.js";

export const createPostImages = async (postImages) => {
    return await db.postImage.createMany({
        data: postImages,
    });
};

export const updatePostImages = async (postId, postImages) => {
    // まず、既存の画像を削除します
    await db.postImage.deleteMany({
        where: { postId },
    });

    // 次に、新しい画像を追加します
    return await db.postImage.createMany({
        data: postImages,
    });
};
