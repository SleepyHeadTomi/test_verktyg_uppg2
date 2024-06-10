// Import functions from other modules
const express = require("express");
let db = require("./database.js");
const {
    getAllProducts,
    getProductById,
    updateProduct,
    addProduct,
    deleteAllProducts,
    deleteProduct
} = require("./logic.js");

// Creates an app-object
const app = express();

// Middleware for sorting the request
app.use(express.json());

// Creates a connection to the database
db.connectDB();

//--- Routes ---
// Get all resources
app.get("/api/products", getAllProducts);

// Get resource by ID
app.get("/api/products/:id", getProductById);
/*
app.get("/api/products/:id", function (req, res) {
    const id = Number(req.params.id);
    const { status, message } = getProductById(id);
    res.status(status).send(message)
});
*/

// Update resource by ID
app.put("/api/products/:id", updateProduct);

// Add resource
app.post("/api/products", addProduct);

// Delete all resources
app.delete("/api/products", deleteAllProducts);

// Delete resource
app.delete("/api/products/:id", deleteProduct);

// Reset database endpoint
app.post("/api/reset-database", async (req, res) => {
    try {
        await db.resetDatabase();
        res.status(200).send("Database reset successfully");
    } catch (error) {
        res.status(500).send("Error resetting database: " + error.message);
    }
});

module.exports = app