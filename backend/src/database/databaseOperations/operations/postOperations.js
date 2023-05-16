// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_post.js
import { db } from "../../prisma/prismaClient.js";

// Create Post
export async function createPost(userId, title, image, originalName, comment) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return await db.post.create({
    data: {
      userId,
      title: title || undefined,
      image: image || undefined,
      originalName: originalName || undefined,
      comment: comment || undefined,
    },
  });
}

// Read All Posts
export async function getAllPosts() {
  return await db.post.findMany({
    include: {
      user: true,
    },
  });
}

// Read Single Post by ID
export async function getPostById(id) {
  if (!id) {
    throw new Error("Post ID is required");
  }

  return await db.post.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}

