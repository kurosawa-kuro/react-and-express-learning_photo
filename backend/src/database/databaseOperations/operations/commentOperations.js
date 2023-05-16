// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_comment.js
import { db } from "../../prisma/prismaClient.js";

// Create Comment
export async function createComment(userId, postId, comment) {
  if (!userId || !postId || !comment) {
    throw new Error("User ID, Post ID, and Comment are required");
  }

  return await db.comment.create({
    data: {
      userId,
      postId,
      comment,
    },
  });
}

// Read All Comments
export async function getAllComments() {
  return await db.comment.findMany({
    include: {
      user: true,
      post: true,
    },
  });
}

// Read Single Comment by ID
export async function getCommentById(id) {
  if (!id) {
    throw new Error("Comment ID is required");
  }

  return await db.comment.findUnique({
    where: { id },
    include: {
      user: true,
      post: true,
    },
  });
}
