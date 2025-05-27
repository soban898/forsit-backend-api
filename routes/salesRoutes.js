const express = require('express');
const router = express.Router();
const {
  addSale,
  getSales,
  getRevenueAnalytics,
} = require('../controllers/salesController');

router.post('/', addSale);                      // POST /api/sales
router.get('/', getSales);                      // GET /api/sales?startDate=&endDate=&productId=&category=
router.get('/analytics', getRevenueAnalytics);  // GET /api/sales/analytics?period=daily|weekly|monthly|yearly

module.exports = router;
