const express = require("express");
const { MongoClient } = require("mongodb");
const { totalAmount, totalsold, totalNotsold, getPieChartPriceRange, getCategories } = require("./utility");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// code for totalAmount ---------------------------

app.get("/getTotalAmount", async (req, res) => {
  const monthNumber = parseInt(req.query.monthNumber) || 3;

  const client = new MongoClient(
    "mongodb+srv://Witch3r:14dkRLNFACf3D2dX@backendsetup.mybiq1t.mongodb.net/?retryWrites=true&w=majority&appName=backendSetup",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  await client.connect();

  const db = client.db("roxilerBackendData"); // Replace 'your_database_name' with your database name
  const collection = db.collection("roxlierProductData"); // Replace 'your_collection_name' with your collection name

  const cursor = collection.find({});

  const products = await cursor.toArray();
  // Close the MongoDB connection
  await client.close();


  res.json({
    totalSale: totalAmount(products,monthNumber),
  });
});

// code for totalsold---------------------------------

app.get("/getTotalSold", async (req, res) => {
  const monthNumber = parseInt(req.query.monthNumber) || 3;

  const client = new MongoClient(
    "mongodb+srv://Witch3r:14dkRLNFACf3D2dX@backendsetup.mybiq1t.mongodb.net/?retryWrites=true&w=majority&appName=backendSetup",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  await client.connect();

  const db = client.db("roxilerBackendData"); // Replace 'your_database_name' with your database name
  const collection = db.collection("roxlierProductData"); // Replace 'your_collection_name' with your collection name

  const cursor = collection.find({});

  const products = await cursor.toArray();
  // Close the MongoDB connection
  await client.close();

  

  
  res.json({
    totalItems: totalsold(products,monthNumber),
  });
});

// code for not sold items --------------------------

app.get("/getTotalNotSold", async (req, res) => {
  const monthNumber = parseInt(req.query.monthNumber) || 3;

  const client = new MongoClient(
    "mongodb+srv://Witch3r:14dkRLNFACf3D2dX@backendsetup.mybiq1t.mongodb.net/?retryWrites=true&w=majority&appName=backendSetup",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  await client.connect();

  const db = client.db("roxilerBackendData"); // Replace 'your_database_name' with your database name
  const collection = db.collection("roxlierProductData"); // Replace 'your_collection_name' with your collection name

  const cursor = collection.find({});

  const products = await cursor.toArray();
  // Close the MongoDB connection
  await client.close();

  

  
  res.json({
    totalItems: totalNotsold(products,monthNumber),
  });
});

// pie chart api price range ---------------------------

app.get("/getPieChartPriceRange", async (req, res) => {
  const monthNumber = parseInt(req.query.monthNumber) || 3;

  const client = new MongoClient(
    "mongodb+srv://Witch3r:14dkRLNFACf3D2dX@backendsetup.mybiq1t.mongodb.net/?retryWrites=true&w=majority&appName=backendSetup",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  await client.connect();

  const db = client.db("roxilerBackendData"); // Replace 'your_database_name' with your database name
  const collection = db.collection("roxlierProductData"); // Replace 'your_collection_name' with your collection name

  const cursor = collection.find({});

  const products = await cursor.toArray();
  // Close the MongoDB connection
  await client.close();

  

  res.json(getPieChartPriceRange(products,monthNumber));
});

// code to fetch pie chart date for categories --------------------------------------------------

app.get("/getCategories", async (req, res) => {
  const monthNumber = parseInt(req.query.monthNumber) || 3;

  const client = new MongoClient(
    "mongodb+srv://Witch3r:14dkRLNFACf3D2dX@backendsetup.mybiq1t.mongodb.net/?retryWrites=true&w=majority&appName=backendSetup",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  await client.connect();

  const db = client.db("roxilerBackendData"); // Replace 'your_database_name' with your database name
  const collection = db.collection("roxlierProductData"); // Replace 'your_collection_name' with your collection name

  const cursor = collection.find({});

  const products = await cursor.toArray();
  // Close the MongoDB connection

  const uniqueCategories = await collection.distinct("category");

  

  await client.close();

  res.json(getCategories(uniqueCategories,products,monthNumber));
});

// code to fetch API-------------------------

app.get("/products", async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Connect to MongoDB
    const client = new MongoClient(
      "mongodb+srv://Witch3r:14dkRLNFACf3D2dX@backendsetup.mybiq1t.mongodb.net/?retryWrites=true&w=majority&appName=backendSetup",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    await client.connect();

    // Access the database and collection
    const db = client.db("roxilerBackendData"); // Replace 'your_database_name' with your database name
    const collection = db.collection("roxlierProductData"); // Replace 'your_collection_name' with your collection name

    const skips = pageSize * (pageNumber - 1);

    const cursor = collection.find({}).skip(skips).limit(pageSize);

    const products = await cursor.toArray();
    // Close the MongoDB connection
    await client.close();
    console.log(pageSize, pageNumber, skips);
    // Return the list of users
    res.set('Access-Control-Allow-Origin', '*');
    res.json(products);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
});

// all 3 api in 1 ------------------------

app.get("/getAllThreeApiInOne", async (req, res) => {
    const monthNumber = parseInt(req.query.monthNumber) || 3;
  
    const client = new MongoClient(
      "mongodb+srv://Witch3r:14dkRLNFACf3D2dX@backendsetup.mybiq1t.mongodb.net/?retryWrites=true&w=majority&appName=backendSetup",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    await client.connect();
  
    const db = client.db("roxilerBackendData"); // Replace 'your_database_name' with your database name
    const collection = db.collection("roxlierProductData"); // Replace 'your_collection_name' with your collection name
  
    const cursor = collection.find({});
  
    const products = await cursor.toArray();
    // Close the MongoDB connection
  
    const uniqueCategories = await collection.distinct("category");
  
    await client.close();
  
    res.json({
        categories:getCategories(uniqueCategories,products,monthNumber),
        totalAmount:totalAmount(products,monthNumber),
        totalsold:totalsold(products,monthNumber),
        totalNotsold:totalNotsold(products,monthNumber),
        getPieChartPriceRange:getPieChartPriceRange(products,monthNumber)
    });
  });

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

// 14dkRLNFACf3D2dX



