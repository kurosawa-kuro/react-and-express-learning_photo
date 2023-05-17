// Path: backend/src/app/controllers/userController.js

import asyncHandler from "express-async-handler";
import { createUser, loginUser, getUserByEmail, getUserById } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

const createUserResponse = (user, token) => {
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};

export const registerUserController = asyncHandler(async (req, res) => {
    const { name, password, email, isAdmin } = req.body;

    if (!name || !password || !email) {
        return res.status(400).json({ error: "Name, password, and email are required" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    const createdUser = await createUser({ name, password, email, isAdmin });
    const token = generateToken(createdUser);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json(createUserResponse(createdUser, token));
});

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const loggedInUser = await loginUser(email, password);
    if (!loggedInUser) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(loggedInUser);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json(createUserResponse(loggedInUser, token));
});

export const getUserController = asyncHandler(async (req, res) => {
    res.status(200).json({ user: req.user });
});
