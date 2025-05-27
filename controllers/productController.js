const Product = require('../models/Product');

// @desc    Add new product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, brand, description, price, sku } = req.body;

    const existing = await Product.findOne({ sku });
    if (existing) {
      return res.status(400).json({ message: 'SKU already exists' });
    }

    const product = new Product({ name, category, brand, description, price, sku });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

// @desc    Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};
