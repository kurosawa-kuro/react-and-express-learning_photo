// Path: backend/test/register.test.js

import request from "supertest";
import app from "../src/app/index.js";
import { createUser, getUserByEmail } from "../src/app/models/userModel.js";
import { db } from "../src/database/prisma/prismaClient.js";

describe("POST /register", () => {
    // Clean up the database before each test run
    beforeEach(async () => {
        await db.user.deleteMany({});
    });

    // Close the database connection after all tests have finished
    afterAll(async () => {
        await db.$disconnect();
    });

    it("should create a new user", async () => {
        // Arrange
        const newUser = {
            name: "bbb",
            password: "aaa",
            email: "bbb@aaa.aaa"
        };

        // Act
        const response = await request(app)
            .post("/register")
            .send(newUser)
            .set("Accept", "application/json");
        console.log("response.body", response.body);

        // const cookies = response.headers['set-cookie'];
        // console.log("cookies", cookies);

        // Get the user from the database
        const userFromDb = await getUserByEmail(newUser.email);

        // Assert
        expect(response.status).toBe(201);
        expect(userFromDb).toMatchObject({
            id: expect.any(Number),
            name: newUser.name,
            email: newUser.email,
        });
        expect(response.body).toMatchObject({
            user: {
                id: expect.any(Number),
                name: newUser.name,
                email: newUser.email,
            },
            token: expect.any(String)
        });
    });
});
