// Path: backend/src/app/controllers/userController.js

import asyncHandler from "express-async-handler";
import { createUser, loginUser, getUserByEmail, getUserById } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerUserController = asyncHandler(async (req, res) => {
    const { name, password, email, isAdmin } = req.body;

    if (!name || !password || !email) {
        res.status(400).json({ error: "Name, password, and email are required" });
        return;
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const createdUser = await createUser({ name, password, email, isAdmin });

        // Generate a JWT
        const token = jwt.sign(
            { id: createdUser.id, name: createdUser.name, email: createdUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Exclude password from the response
        const user = { id: createdUser.id, name: createdUser.name, email: createdUser.email };

        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "User created", user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    try {
        const loggedInUser = await loginUser(email, password);
        if (loggedInUser) {
            // Generate a JWT
            const token = jwt.sign(
                { id: loggedInUser.id, name: loggedInUser.name, email: loggedInUser.email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            // Exclude password from the response
            const user = { id: loggedInUser.id, name: loggedInUser.name, email: loggedInUser.email };

            // Save the JWT in a cookie
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ message: "Logged in successfully", user, token });
        } else {
            res.status(400).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// クライアントからのトークンを受け取り、デコードしてユーザーを返す
export const getUserController = asyncHandler(async (req, res) => {
    res.status(200).json({ user: req.user });
});