// backend\test\user.test.js

import request from "supertest";
import app from "../src/app/index.js";
import { getUserByEmail, createUser } from "../src/app/models/userModel.js";
import { db } from "../src/database/prisma/prismaClient.js";

let newUser;

beforeEach(async () => {
    // Clean up the database before each test run
    await db.user.deleteMany({});
});

// Close the database connection after all tests have finished
afterAll(async () => {
    await db.user.deleteMany({});
    await db.$disconnect();
});

describe("POST /register", () => {

    it("should create a new user", async () => {

        // Set up a new user
        newUser = {
            name: "Test User",
            password: "test123",
            email: "testuser@aaa.com"
        };

        // Act
        const response = await request(app)
            .post("/register")
            .send(newUser)
            .set("Accept", "application/json");
        console.log("newUser", newUser);
        console.log("POST /register should create a new user response.body", response.body);


        // Get the user from the database
        const userFromDb = await getUserByEmail(newUser.email);

        // Expected user response
        const expectedUserResponse = {
            user: {
                id: expect.any(Number),
                name: newUser.name,
                email: newUser.email,
            },
            token: expect.any(String),
        };

        // Assert
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(expectedUserResponse);
        expect(userFromDb).toMatchObject({
            id: expect.any(Number),
            name: newUser.name,
            email: newUser.email,
        });
    });
});

describe("POST /login", () => {
    beforeEach(async () => {
        // Set up a new user
        newUser = {
            name: "Test User",
            password: "test123",
            email: "testuser@aaa.com"
        };

        // Register the user
        await createUser(newUser);
    });

    it("should login a user", async () => {
        // Act
        const response = await request(app)
            .post("/login")
            .send({ email: newUser.email, password: newUser.password })
            .set("Accept", "application/json");

        // Get the user from the database
        const userFromDb = await getUserByEmail(newUser.email);

        // Expected user response
        const expectedUserResponse = {
            user: {
                id: expect.any(Number),
                name: newUser.name,
                email: newUser.email,
            },
            token: expect.any(String),
        };

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedUserResponse);
        expect(userFromDb).toMatchObject({
            id: expect.any(Number),
            name: newUser.name,
            email: newUser.email,
        });
    });
});


describe("POST /logout", () => {
    it("should logout a user", async () => {
        // Log the user in
        const loginResponse = await request(app)
            .post("/login")
            .send({ email: newUser.email, password: newUser.password })
            .set("Accept", "application/json");

        const token = loginResponse.body.token;

        // Act
        const response = await request(app)
            .post("/logout")
            .set("Cookie", `token=${token}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: "User logged out"
        });
    });
});
