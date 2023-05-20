// Path: backend/test/register.test.js

import request from "supertest";
import app from "../src/app/index.js";
import { createUser, getUserByEmail } from "../src/app/models/userModel.js";

// Mock the getUserByEmail and createUser function
jest.mock("../src/app/models/userModel.js", () => ({
    getUserByEmail: jest.fn(),
    createUser: jest.fn()
}));

describe("POST /register", () => {
    it("should create a new user", async () => {
        // Arrange
        const newUser = {
            name: "bbb",
            password: "aaa",
            email: "bbb@aaa.aaa"
        };

        // Assuming there is no existing user with the same email
        getUserByEmail.mockResolvedValue(null);

        // Assuming user creation is successful and returns the created user
        createUser.mockResolvedValue({ ...newUser, id: 1 });

        // Act
        const response = await request(app)
            .post("/register")
            .send(newUser)
            .set("Accept", "application/json");
        // console.log({ response });
        const cookies = response.headers['set-cookie'];
        console.log("cookies", cookies);

        // Assert
        expect(response.status).toBe(201);
        expect(getUserByEmail).toHaveBeenCalledWith(newUser.email);
        expect(createUser).toHaveBeenCalledWith(newUser);
        expect(response.body).toMatchObject({
            user: {
                id: 1,
                name: newUser.name,
                email: newUser.email,
            },
            token: expect.any(String)
        });
    });
});
