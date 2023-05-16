// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_tag.js
import { db } from "../../prisma/prismaClient.js";

// Create Tag
export async function createTag(name) {
    if (!name) {
        throw new Error("Tag name is required");
    }

    return await db.tag.create({
        data: {
            name,
        },
    });
}

// Read All Tags
export async function getAllTags() {
    return await db.tag.findMany();
}

// Read Single Tag by ID
export async function getTagById(id) {
    if (!id) {
        throw new Error("Tag ID is required");
    }

    return await db.tag.findUnique({
        where: { id },
    });
}