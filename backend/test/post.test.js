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

const imagePath = path.join(__dirname, './fixtures', 'test-image.jpg');

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

describe("GET /posts", () => {
    it("should get paginated posts", async () => {
        // create multiple posts for testing pagination
        const post1 = { ...newPost, title: "Test Post 1" };
        const post2 = { ...newPost, title: "Test Post 2" };
        const post3 = { ...newPost, title: "Test Post 3" };
        await createNewPost(post1);
        await createNewPost(post2);
        const createdPost = await createNewPost(post3);

        const response = await request(app)
            .get(`/posts?page=1`)
            .set("Accept", "application/json")
            .set("Cookie", `token=${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            currentPage: 1,
            totalPages: expect.any(Number),
            itemsPerPage: expect.any(Number),
            data: expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    comment: expect.any(String),
                    userId: newPost.userId,
                }),
            ]),
        });

        const postInResponse = response.body.data.find((post) => post.id === createdPost.id);
        expect(postInResponse).toMatchObject({
            id: createdPost.id,
            title: post3.title,
            comment: post3.comment,
            userId: newPost.userId,
        });
    });
});


describe("GET /posts/:id", () => {
    it("should get a single post by id", async () => {
        const createdPost = await createNewPost(newPost);

        const response = await request(app)
            .get(`/posts/${createdPost.id}`)
            .set("Accept", "application/json")
            .set("Cookie", `token=${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            id: expect.any(Number),
            title: newPost.title,
            comment: newPost.comment,
            userId: newPost.userId,
        });
    });
});

// describe("PUT /posts/:id", () => {
//     it("should update a post with new data", async () => {
//         const createdPost = await createNewPost(newPost);

//         const updatedPostData = {
//             title: "Updated Title",
//             comment: "Updated Comment",
//         };

//         const response = await request(app)
//             .put(`/posts/${createdPost.id}`)
//             .field("title", updatedPostData.title)
//             .field("comment", updatedPostData.comment)
//             .attach('images', imagePath, 'test-image.jpg')
//             .set("Accept", "application/json")
//             .set("Cookie", `token=${token}`);
//         console.log("should update a post with new data response", response.body);

//         expect(response.status).toBe(200);
//         expect(response.body).toMatchObject({
//             message: 'Post updated successfully',
//             data: {
//                 id: expect.any(Number),
//                 title: updatedPostData.title,
//                 comment: updatedPostData.comment,
//                 userId: newPost.userId,
//             },
//         });

//         // Verify that the post was actually updated in the database
//         const updatedPost = await db.post.findUnique({ where: { id: createdPost.id } });
//         expect(updatedPost).toMatchObject({
//             id: createdPost.id,
//             title: updatedPostData.title,
//             comment: updatedPostData.comment,
//             userId: newPost.userId,
//         });
//     });
// });
