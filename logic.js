// Import functions from other modules
const { 
    getProductsFromDB,
    getProdFromDB,
    updateProdInDB,
    addProductToDB,
    deleteAllFromDB,
    deleteProdFromDB
} = require("./database");


// Function to handle GET-requests
async function getAllProducts(req, res) {
    try {
        const nameQuery = req.query.name;

        const [result] = await getProductsFromDB(nameQuery);

        if(result.length === 0) {
            return res.status(404).json({ message: "Not Found"});
        }
        else {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Function to handle GET-requests for a specific resource
async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({ message: "Bad Request"});

        const [result] = await getProdFromDB(id);

        if(result.length === 0) {
            return res.status(404).json({ message: "Not Found"});
        }
        else {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

// Function to handle UPDATE-requests
async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const body = req.body;

        if(isNaN(id)) return res.status(400).json({ message: "Bad Request"});

        const [result] = await updateProdInDB(id, body);

        if(result.length === 0) {
            return res.status(404).json({ message: "Not Found"});
        }
        else {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

// Function to handle POST-requests
async function addProduct(req, res) {
    try {
        const body = req.body;

        if (body.name === undefined || body.description === undefined ||
            isNaN(body.price) || isNaN(body.quantity) || body.category === undefined) {
            return res.status(400).json({ message: "Bad Request" });
        }

        const [result] = await addProductToDB(body);

        if (result.affectedRows === 0) {
            return res.status(500).json({ message: "Could not add product" });
        } else {
            return res.status(201).json({ message: "Product added successfully" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}
    
// Function to handle DELETE-requests
async function deleteAllProducts(req, res) {
    const [result] = await deleteAllFromDB();

    if(result.affectedRows === 0) {
        res.status(500).json({ message: "Server error"});
    }
    else {
        res.status(200).json({ message: "Product deleted"});
    }
}

// Function to handle a specific DELETE-request
async function deleteProduct(req, res) {
    const id = Number(req.params.id);

    if(isNaN(id)) return res.status(400).json({ message: "Bad Request"});

    const [result] = await deleteProdFromDB(id);

    if(result.affectedRows === 0) {
        res.status(500).json({ message: "Server error"});
    }
    else {
        res.status(200).json({ message: "Product deleted"});
    }
}

module.exports = { 
    getAllProducts,
    getProductById,
    updateProduct,
    addProduct,
    deleteAllProducts,
    deleteProduct
};