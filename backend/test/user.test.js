// Path: backend/test/register.test.js

import request from "supertest";
import app from "../src/app/index.js";


describe("POST /register", () => {
    it("should create a new user", async () => {
        const newUser = {
            name: "bbb",
            password: "aaa",
            email: "bbb@aaa.aaa",
            isAdmin: false,
        };


        const response = await request(app)
            .post("/register")
            .send(newUser)
            .set("Accept", "application/json");
        console.log("response.body: ", response.body);

        expect(response.status).toBe(201);
    });
});
