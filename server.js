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
/*if (process.env.NODE_ENV !== 'test') {
    db.connectDB();
} else {
    console.log('Skipping database connection in test environment.');
}*/

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

/*module.exports = (databaseModule = db) => {
    db = databaseModule;
    return app;
};*/

module.exports = app