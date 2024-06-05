// Import functions from other modules
const express = require("express");
const { connectDB } = require("./database.js");
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
connectDB();

//--- Routes ---
// Get all resources
app.get("/api/products", getAllProducts);

// Get resource by ID
app.get("/api/products/:id", getProductById);

// Update resource by ID
app.put("/api/products/:id", updateProduct);

// Add resource
app.post("/api/products", addProduct);

// Delete all resources
app.delete("/api/products", deleteAllProducts);

// Delete resource
app.delete("/api/products/:id", deleteProduct);

module.exports = app;