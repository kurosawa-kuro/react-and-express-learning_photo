import request from "supertest";
import path from "path";
import fs from "fs";
import app from "../src/app/index.js";
import { getUserByEmail, createUser } from "../src/app/models/userModel.js";
import { createNewPost } from "../src/app/models/postModel.js";
import { db } from "../src/database/prisma/prismaClient.js";

const newUser = {
    name: "Test User",
    password: "test123",
    email: "testuser@aaa.com"
};

const newPost = {
    title: "Test Post",
    comment: "Test Comment",
    userId: 1,
};

let token;

beforeEach(async () => {
    await db.postImage.deleteMany({});
    await db.post.deleteMany({});
    await db.user.deleteMany({});

    const user = await createUser(newUser);
    const loginResponse = await request(app)
        .post("/login")
        .send({ email: newUser.email, password: newUser.password })
        .set("Accept", "application/json");
    token = loginResponse.body.token;
    newPost.userId = user.id;
});

afterEach(async () => {
    await db.postImage.deleteMany({});
    await db.post.deleteMany({});
    await db.user.deleteMany({});
});

describe("POST /posts", () => {
    it("should find the test image", () => {
        const imagePath = path.join(__dirname, './fixtures', 'test-image.jpg');
        const imageExists = fs.existsSync(imagePath);
        expect(imageExists).toBe(true);
    });

    it("should create a new post with images", async () => {
        const imagePath = path.join(__dirname, './fixtures', 'test-image.jpg');

        const response = await request(app)
            .post("/posts")
            .field("title", newPost.title)
            .field("comment", newPost.comment)
            .attach('images', imagePath, 'test-image.jpg')
            .set("Accept", "application/json")
            .set("Cookie", `token=${token}`);

        const postFromDb = await createNewPost(newPost);

        const expectedPostResponse = {
            message: 'Post created successfully',
            data: {
                id: expect.any(Number),
                title: newPost.title,
                comment: newPost.comment,
                userId: expect.any(Number),
            },
        };

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(expectedPostResponse);
        expect(postFromDb).toMatchObject({
            id: expect.any(Number),
            title: newPost.title,
            comment: newPost.comment,
            userId: newPost.userId,
        });
    });
});
