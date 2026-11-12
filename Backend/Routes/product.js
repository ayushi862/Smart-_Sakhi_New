
const express = require("express");
const Product = require("./models/product");

const router = express.Router();

// GET: All products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Fetch products error:", error.message);
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});

// POST: Add a new product
router.post("/", async (req, res) => {
  try {
    const { name, category, price, seller, description, emoji } = req.body;

    if (
      !name?.trim() ||
      !category ||
      price === undefined ||
      !seller?.trim() ||
      !description?.trim()
    ) {
      return res.status(400).json({
        message: "Please provide all required product fields",
      });
    }

    const product = await Product.create({
      name,
      category,
      price,
      seller,
      description,
      emoji,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product error:", error.message);

    res.status(400).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
});

module.exports = router;
