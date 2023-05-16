// Path: backend/src/app/models/userModel.js

import bcyptjs from "bcryptjs";
import { db } from "../../database/prisma/prismaClient.js";

export const createUser = async ({ name, password, email, isAdmin }) => {
    const newUser = await db.user.create({
        data: { name, password: await bcyptjs.hash(password, 10), email, isAdmin },
    });

    return newUser;
};

export async function getUserByEmail(email) {
    const user = await db.user.findUnique({ where: { email } });
    return user;
};

export async function loginUser(email, password) {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        throw new Error("User does not exist");
    }

    // Check if password is correct
    const isPasswordCorrect = await bcyptjs.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        throw new Error("Password is incorrect");
    }

    return existingUser;
}

// getUserById
export async function getUserById(id) {
    if (!id) {
        throw new Error("ID is required");
    }

    return await db.user.findUnique({ where: { id } });
}