const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts } = require('../controllers/productController');

router.post('/', addProduct);         // POST /api/products
router.get('/', getAllProducts);      // GET /api/products

module.exports = router;
