// backend\src\app\models\userModel.js

import bcrypt from "bcryptjs";
import { db } from "../../database/prisma/prismaClient.js";

export const createUser = async ({ name, password, email, isAdmin }) => {
    const hashedPassword = await hashPassword(password);
    const newUser = await db.user.create({
        data: { name, password: hashedPassword, email, isAdmin },
    });

    return omitPassword(newUser);
};

export const getUserByEmail = async (email) => {
    const user = await db.user.findUnique({ where: { email } });
    return user ? omitPassword(user) : null;
};

export const loginUser = async (email, password) => {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error("User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("Password is incorrect");
    }

    return omitPassword(user);
}

export const getUserById = async (id) => {
    const user = await db.user.findUnique({ where: { id } });
    return user ? omitPassword(user) : null;
}

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const omitPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
