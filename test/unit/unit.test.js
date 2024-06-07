const assert = require("assert");
const { 
  getAllProducts,
  getProductById,
  updateProduct,
  addProduct,
  deleteAllProducts,
  deleteProduct
} = require("../../logic.js");
const sinon = require("sinon");
const db = require("../../database.js");

describe("Unit test on the function getAllProducts", function() {

  it("should return all products from DB", async function() {
    // Simulates the database
    const mockProducts = [
      { id: 1, name: "Product 1", description: "a product", price: 25, quantity: 25, category: "something" },
      { id: 2, name: "Product 2", description: "a product", price: 25, quantity: 25, category: "something" },
    ];

    // Creates a stub function for getProductsFromDB
    const stub = sinon.stub(db, "getProductsFromDB").resolves(mockProducts);

    // Calls the function getAllproducts with apropriate request and response arguments
    const req = { query: { name: "" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    await getAllProducts(req, res);

    // Verfies that the corrects response is returned
    assert(res.status.calledWith(200));
    assert(res.json.calledWith(mockProducts));

    // Restores the mocked function
    stub.restore();
  });

  it("should return a status response of 200 when sending a query parameter", async function() {
    // Simulates the database
    const mockProducts = 
      { id: 1, name: "Product 1", description: "a product", price: 25, quantity: 25, category: "something" };

    // Creates a stub function for getProductsFromDB
    const stub = sinon.stub(db, "getProductsFromDB").resolves(mockProducts);

    // Calls the function getAllproducts with apropriate request and response arguments
    const req = { query: { name: "Product 1"}};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    };
  
    await getAllProducts(req, res);
    
    // Verfies that the corrects response is returned
    assert(res.status.calledWith(200));
    assert(res.json.calledWith(mockProducts));

    // Restores the mocked function
    stub.restore();
  });

  it("should return a status response of 404 when sending a bad query", async function() {
    // Simulates the database
    const mockProducts = [ ];

    // Creates a stub function for getProductsFromDB
    const stub = sinon.stub(db, "getProductsFromDB").resolves(mockProducts);

    // Calls the function getAllproducts with apropriate request and response arguments
    const req = { query: { name: "Bad Product"}};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    };
    await getAllProducts(req, res);

    // Verfies that the corrects response is returned
    assert(res.status.calledWith(404));
    assert(res.json.calledWith({ message: "Not Found"}));

    // Restores the mocked function
    stub.restore();
  });
});

describe("Unit test for the function getProductById", function() {
  it("should return status 400 Bad Request when sending a invalid parameter", async function() {
    const req = { params: { id: "Invalid ID" }};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await getProductById(req, res);

    assert(res.status.calledOnce);
    assert(res.status.calledWith(400));
    assert(res.json.calledOnce);
    assert(res.json.calledWith({ message: "Bad Request" }));;
  });

  it("should return status 200 when sending a valid ID", async function() {
    const mockProducts = 
    { id: 1, name: "Product 1", description: "a product", price: 25, quantity: 25, category: "something" };

    const stub = sinon.stub(db, "getProdFromDB").resolves(mockProducts);

    const req = { params: { id: 1 }};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await getProductById(req, res);

    assert(res.status.calledWith(200));
    assert(res.json.calledWith(mockProducts));

    stub.restore();
  });

  it("should return status 404 when sending a invalid ID", async function() {
    const mockProducts = [ ]
    const stub = sinon.stub(db, "getProdFromDB").resolves(mockProducts);

    const req = { params: { id: 100 }};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await getProductById(req, res);

    assert(res.status.calledWith(404));
    assert(res.json.calledWith({ message: "Not Found"}));

    stub.restore();
  });
});

describe("Unit test for the function updateProduct", function() {
  it("should return status 400 Bad Request when sending a invalid parameter", async function() {
    const req = { 
      params: { id: "Invalid param" },
      body: { name: "Product 100", description: "a product", price: 25, quantity: 25, category: "something" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await updateProduct(req, res);

    assert(res.status.calledOnce);
    assert(res.status.calledWith(400));
    assert(res.json.calledOnce);
    assert(res.json.calledWith({ message: "Bad Request" }));;
  });

  it("should return status 200 when sending a valid ID", async function() {
    const mockProducts = 
    { id: 1, name: "Product 100", description: "a product", price: 25, quantity: 25, category: "something" };

    const stub = sinon.stub(db, "updateProdInDB").resolves(mockProducts);

    const req = { 
      params: { id: 1 },
      body: { name: "Product 100", description: "a product", price: 25, quantity: 25, category: "something" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await updateProduct(req, res);

    assert(res.status.calledWith(200));
    assert(res.json.calledWith({ message: "Changes saved"}));

    stub.restore();
  });

  it("should return status 404 when sending a invalid ID", async function() {
    const mockProducts = { affectedRows: 0 }
    const stub = sinon.stub(db, "updateProdInDB").resolves(mockProducts);

    const req = { 
      params: { id: 100 },
      body: { name: "Product 100", description: "a product", price: 25, quantity: 25, category: "something" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await updateProduct(req, res);

    assert(res.status.calledWith(404));
    assert(res.json.calledWith({ message: "Not Found"}));

    stub.restore();
  });
});

describe("Unit test for the function addProduct", function() {
  it("should return status 400 Bad Request when sending a invalid body input", async function() {
    const req = { 
      body: { name: undefined, description: "a product", price: 25, quantity: 25, category: "something" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await addProduct(req, res);

    assert(res.status.calledOnce);
    assert(res.status.calledWith(400));
    assert(res.json.calledOnce);
    assert(res.json.calledWith({ message: "Bad Request" }));;
  });

  it("should return status 200 when sending a correct declared body", async function() {
    const mockProducts = 
    { id: 1, name: "Product 100", description: "a product", price: 25, quantity: 25, category: "something" };

    const stub = sinon.stub(db, "addProductToDB").resolves(mockProducts);

    const req = { 
      body: { name: "Product 100", description: "a product", price: 25, quantity: 25, category: "something" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await addProduct(req, res);

    assert(res.status.calledWith(201));
    assert(res.json.calledWith({ message: "Product added successfully" }));

    stub.restore();
  });

  it("should return status 500 Internal server error", async function() {
    const mockProducts = { affectedRows: 0 }
    const stub = sinon.stub(db, "addProductToDB").resolves(mockProducts);

    const req = { 
      body: { name: "Product 1", description: "a product", price: 25, quantity: 25, category: "something" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await addProduct(req, res);

    assert(res.status.calledWith(500));
    assert(res.json.calledWith({ message: "Internal server error" }));

    stub.restore();
  });
});

describe("Unit test for the function deleteAllProducts", function() {
  it("should return status 200 when deleting all products", async function() {
    const mockResponse = [{ affectedRows: 1 }];

    const stub = sinon.stub(db, "deleteAllFromDB").resolves(mockResponse);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await deleteAllProducts(req, res);

    assert(res.status.calledWith(200));
    assert(res.json.calledWith({ message: "Products Deleted"}));

    stub.restore();
  });

  it("should return status 500 Internal server error when the deletion fails", async function() {
    const mockProducts = []
    const stub = sinon.stub(db, "deleteAllFromDB").resolves(mockProducts);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await deleteAllProducts(req, res);

    assert(res.status.calledWith(500));
    assert(res.json.calledWith({ message: "Internal server error" }));

    stub.restore();
  });
});

describe("Unit test for the function deleteProduct", function() {
  it("should return status 400 Bad Request when sending a invalid parameter", async function() {
    const req = { 
      params: { id: "Invalid param" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await deleteProduct(req, res);

    assert(res.status.calledOnce);
    assert(res.status.calledWith(400));
    assert(res.json.calledOnce);
    assert(res.json.calledWith({ message: "Bad Request" }));;
  });

  it("should return status 200 when deleting specified product", async function() {
    const mockResponse = [{ affectedRows: 1 }];

    const stub = sinon.stub(db, "deleteProdFromDB").resolves(mockResponse);

    const req = { params: { id: 1 }};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await deleteProduct(req, res);

    assert(res.status.calledWith(200));
    assert(res.json.calledWith({ message: "Product Deleted"}));

    stub.restore();
  });

  it("should return status 500 Internal server error when the deletion fails", async function() {
    const mockProducts = []
    const stub = sinon.stub(db, "deleteProdFromDB").resolves(mockProducts);

    const req = { params: { id: 1 }};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await deleteProduct(req, res);

    assert(res.status.calledWith(500));
    assert(res.json.calledWith({ message: "Internal server error" }));

    stub.restore();
  });
});