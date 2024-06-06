// Import functions from other modules
const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a database connection
let connection = null;
async function connectDB() {
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
}

// Function to send GET-requests to the db
async function getProductsFromDB(nameQuery) {
    let queryParams = [];
    let sqlQuery = null;

    if(nameQuery) {
        sqlQuery = "SELECT * FROM products WHERE name LIKE ?";
        queryParams.push(`%${nameQuery}%`);
    }
    else {
        sqlQuery = "SELECT * FROM products";
    }
    const [result] = await connection.query(sqlQuery, queryParams);
    
    return result;
}

// Function to send a speific GET-request to the db
async function getProdFromDB(id) {
    sqlQuery = "SELECT * FROM products WHERE id = ?";

    const [result] = await connection.query(sqlQuery, id);

    return result;
}

// Function to send UPDATE-requests to the db
async function updateProdInDB(id, body) {
    const { name, description, price, quantity, category } = body;
    sqlQuery = `UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, category = ?
        WHERE id = ?`;

    const [result] = await connection.query(sqlQuery, [name, description, price, quantity, category, id]);
    return result;
}

// // Function to send POST-requests to the db
async function addProductToDB(body) {
    const { name, description, price, quantity, category } = body;
    const sqlQuery = `INSERT INTO products (name, description, price, quantity, category) 
                VALUES (?, ?, ?, ?, ?)`;
                
    const [result] = await connection.query(sqlQuery, [name, description, price, quantity, category]);

    return result;
}

// Function to send DELETE-requests to the db
async function deleteAllFromDB() {
    const sqlQuery = "DELETE FROM products";

    const result = await connection.query(sqlQuery);
    console.log(result);
    return result;
}

// Function to send a specific GET-request to the db
async function deleteProdFromDB(id) {
    const sqlQuery = "DELETE FROM products WHERE id = ?";

    const result = await connection.query(sqlQuery, [id]);

    return result;
}

module.exports = {
   connectDB,
   getProductsFromDB,
   getProdFromDB,
   updateProdInDB,
   addProductToDB,
   deleteAllFromDB,
   deleteProdFromDB
};