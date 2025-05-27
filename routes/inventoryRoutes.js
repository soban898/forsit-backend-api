const express = require('express');
const router = express.Router();
const {
  getInventory,
  updateInventory,
  getLowStock,
} = require('../controllers/inventoryController');

router.get('/', getInventory);                // GET /api/inventory
router.post('/update', updateInventory);      // POST /api/inventory/update
router.get('/low-stock', getLowStock);        // GET /api/inventory/low-stock

module.exports = router;
