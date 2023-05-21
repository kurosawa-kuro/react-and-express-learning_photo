import request from "supertest";
import jwt from 'jsonwebtoken';
import app from "../src/app/index.js";
import { getUserByEmail, createUser } from "../src/app/models/userModel.js";
import { db } from "../src/database/prisma/prismaClient.js";

const newUser = {
    name: "Test User",
    password: "test123",
    email: "testuser@aaa.com"
};

describe("POST /register", () => {
    beforeEach(async () => {
        await db.user.deleteMany({});
    });

    afterEach(async () => {
        await db.user.deleteMany({});
    });

    it("should create a new user", async () => {
        const response = await request(app)
            .post("/register")
            .send(newUser)
            .set("Accept", "application/json");

        const userFromDb = await getUserByEmail(newUser.email);

        const expectedUserResponse = {
            user: {
                id: expect.any(Number),
                name: newUser.name,
                email: newUser.email,
            },
            token: expect.any(String),
        };

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
        await db.user.deleteMany({});
        await createUser(newUser);
    });

    afterEach(async () => {
        await db.user.deleteMany({});
    });

    it("should login a user", async () => {
        const response = await request(app)
            .post("/login")
            .send({ email: newUser.email, password: newUser.password })
            .set("Accept", "application/json");

        const userFromDb = await getUserByEmail(newUser.email);

        const expectedUserResponse = {
            user: {
                id: expect.any(Number),
                name: newUser.name,
                email: newUser.email,
            },
            token: expect.any(String),
        };

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
    beforeEach(async () => {
        await db.user.deleteMany({});
        await createUser(newUser);
    });

    afterEach(async () => {
        await db.user.deleteMany({});
    });

    it("should logout a user", async () => {
        const loginResponse = await request(app)
            .post("/login")
            .send({ email: newUser.email, password: newUser.password })
            .set("Accept", "application/json");

        const token = loginResponse.body.token;

        const response = await request(app)
            .post("/logout")
            .set("Cookie", `token=${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: "User logged out"
        });
    });
});

describe("Auth Middleware Error Handling", () => {
    beforeEach(async () => {
        await db.user.deleteMany({});
        await createUser(newUser);
    });

    afterEach(async () => {
        await db.user.deleteMany({});
    });

    it("should return 401 and an error message when an error occurs during token verification", async () => {
        // Mock an error during token verification
        jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
            throw new Error("Token verification failed");
        });

        const response = await request(app).get("/protected");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: "unauthenticated" });
    });
});
