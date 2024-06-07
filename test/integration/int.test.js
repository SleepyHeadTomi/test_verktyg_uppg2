const request = require("supertest");
const server = require("../../server.js");
const assert = require("assert");
const mysql = require("mysql2/promise");
require("dotenv").config();

describe("Routes integration tests", function () {
    let connection = null;
    beforeEach(async function() {
        try {
            connection = await mysql.createConnection({
                user: process.env.USER,
                password: process.env.PASSWORD,
                host: process.env.HOST,
                database: process.env.DATABASE
            })
    
            console.log("Connected to database.");
        } catch (error) {
            console.log("Something went wrong when connecting to the database", error);
        }

        await connection.query("DROP TABLE IF EXISTS products");

        await connection.query(`CREATE TABLE products (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            name varchar(255) NOT NULL,
            description varchar(255) NOT NULL,
            price INT NOT NULL,
            quantity INT NOT NULL,
            category varchar(255) NOT NULL
        )`);

        await connection.query(`INSERT INTO products (name, description, price, quantity, category) 
            VALUES ("sausage", "a snack", 25, 52, "food item")`);
    })

    afterEach(async function() {
        await connection.query("DELETE FROM products");
        await connection.end();
    })

    it("should return status 200 and all products", async function() {
        const response = await request(server).get("/api/products");
          
        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
        assert.strictEqual(response.body.length, 1);
        assert.strictEqual(response.body[0].name, "sausage");        
    });

    it("should return status 200 and the specified product", async function() {
        const response = await request(server).get("/api/products?name=sausage");
        
        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
        assert.strictEqual(response.body.length, 1);
        assert.strictEqual(response.body[0].name, "sausage");        
    });

    it("should return status 404 Not Found when sending an invalid query", async function() {
        const response = await request(server).get("/api/products?name=pizza");
        
        assert.strictEqual(response.status, 404);
        assert.strictEqual(response.body.message, "Not Found" );
    });

    it("should return status 200 and a product containing specified query", async function() {
        const response = await request(server).get("/api/products?name=au");
        
        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
        assert.strictEqual(response.body.length, 1);
        assert.strictEqual(response.body[0].name, "sausage");        
    });

    it("should return status 200 and the specified product", async function() {
        const id = 1;
        const response = await request(server).get(`/api/products/${id}`);
        
        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
        assert.strictEqual(response.body.length, 1);
        assert.strictEqual(response.body[0].name, "sausage");        
    });

    it("should return status 404 Not Found when sending invalid ID", async function() {
        const id = 100;
        const response = await request(server).get(`/api/products/${id}`);
        
        assert.strictEqual(response.status, 404);
        assert.strictEqual(response.body.message, "Not Found" );
    });

    it("should return status 200 Not Found when sending invalid ID", async function() {
        const id = 1;
        const newUserInfo = {
            name: "Hamburger",
            description: "a meal",
            price: 75,
            quantity: 65,
            category: "food item"
        }
        const response = await request(server)
            .put(`/api/products/${id}`)
            .send(newUserInfo);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, "Changes saved")
    
    });

    it("should return status 404 Not Found when sending invalid ID", async function() {
        const id = 2;
        const newUserInfo = {
            name: "Hamburger",
            description: "a meal",
            price: 75,
            quantity: 65,
            category: "food item"
        }
        const response = await request(server)
            .put(`/api/products/${id}`)
            .send(newUserInfo);

        assert.strictEqual(response.status, 404);
        assert.strictEqual(response.body.message, "Not Found" );
    });

    it("should return status 201 Product added successfully", async function() {
        const newUserInfo = {
            name: "Hamburger",
            description: "a meal",
            price: 75,
            quantity: 65,
            category: "food item"
        }
        const response = await request(server)
            .post("/api/products")
            .send(newUserInfo);

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message, "Product added successfully" );
    });

    /*it("should return status 500 Internal server error", async function() {
        const newUserInfo = {
            name: "Hamburger",
            description: "a meal",
            price: 75,
            quantity: 65,
            category: "food item"
        }
        const response = await request(server)
            .post("/api/products")
            .send(newUserInfo);

        assert.strictEqual(response.status, 500);
        assert.strictEqual(response.body.message, "Internal server error" );
    });*/

    it("should return status 200 Products Deleted", async function() {
        const response = await request(server)
            .delete("/api/products")

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, "Products Deleted" );
    });

    it("should return status 200 Product Deleted", async function() {
        const id = 1;
        const response = await request(server)
            .delete(`/api/products/${id}`)

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, "Product Deleted" );
    });

});