// backend\test\tag.test.js

import request from "supertest";
import app from "../src/app/index.js";
import { createUser, getUserByEmail } from "../src/app/models/userModel.js";
import { createNewTag, getAllTags, getSingleTag, updateTag, deleteTag } from "../src/app/models/tagModel.js";
import { db } from "../src/database/prisma/prismaClient.js";

let newUser;
let token;
let newTag;

beforeEach(async () => {
    // Clean up the database before each test run
    await db.user.deleteMany({});
    await db.tag.deleteMany({});

    // Set up a new user
    newUser = {
        name: "Test User",
        password: "test123",
        email: "testuser@aaa.com"
    };

    // Register the user
    await createUser(newUser);

    // Login the user to get the token
    const response = await request(app)
        .post("/login")
        .send({ email: newUser.email, password: newUser.password })
        .set("Accept", "application/json");

    token = response.body.token;

    // Set up a new tag
    newTag = {
        name: "Test Tag"
    };

    // Create a new tag
    await createNewTag(newTag);
});

// Close the database connection after all tests have finished
afterAll(async () => {
    await db.user.deleteMany({});
    await db.tag.deleteMany({});
    await db.$disconnect();
});

describe("GET /tags", () => {
    it("should get all tags", async () => {
        // Act
        const response = await request(app)
            .get("/tags")
            .set("Cookie", `token=${token}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: newTag.name
                })
            ])
        );
    });
});

describe("GET /tags/:id", () => {
    it("should get a single tag", async () => {
        // Get the tag from the database
        const tagsFromDb = await getAllTags();
        const tagFromDb = tagsFromDb[0];

        // Act
        const response = await request(app)
            .get(`/tags/${tagFromDb.id}`)
            .set("Cookie", `token=${token}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.data).toMatchObject({
            id: tagFromDb.id,
            name: tagFromDb.name
        });
    });
});

describe("POST /tags", () => {
    it("should create a new tag", async () => {
        const anotherTag = {
            name: "Another Test Tag"
        };

        // Act
        const response = await request(app)
            .post("/tags")
            .send(anotherTag)
            .set("Cookie", `token=${token}`);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.data).toMatchObject({
            id: expect.any(Number),
            name: anotherTag.name
        });
    });
});

describe("PUT /tags/:id", () => {
    it("should update a tag", async () => {
        // Get the tag from the database
        const tagsFromDb = await getAllTags();
        const tagFromDb = tagsFromDb[0];

        const updatedTag = {
            name: "Updated Test Tag"
        };

        // Act
        const response = await request(app)
            .put(`/tags/${tagFromDb.id}`)
            .send(updatedTag)
            .set("Cookie", `token=${token}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.data).toMatchObject({
            id: tagFromDb.id,
            name: updatedTag.name
        });
    });
});

describe("DELETE /tags/:id", () => {
    it("should delete a tag", async () => {
        // Get the tag from the database
        const tagsFromDb = await getAllTags();
        const tagFromDb = tagsFromDb[0];

        // Act
        const response = await request(app)
            .delete(`/tags/${tagFromDb.id}`)
            .set("Cookie", `token=${token}`);

        // Assert
        expect(response.status).toBe(200);
    });
});

