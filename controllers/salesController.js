const Sale = require('../models/Sale');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Add a new sale
exports.addSale = async (req, res) => {
  try {
    const { productId, quantitySold, saleAmount, platform } = req.body;
    const sale = new Sale({ product: productId, quantitySold, saleAmount, platform });
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error adding sale', error });
  }
};

// Get sales (filter by date, product, category)
exports.getSales = async (req, res) => {
  try {
    const { startDate, endDate, productId, category } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.saleDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (productId) {
      filter.product = productId;
    }

    if (category) {
      const products = await Product.find({ category });
      const productIds = products.map(p => p._id);
      filter.product = { $in: productIds };
    }

    const sales = await Sale.find(filter).populate('product');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error });
  }
};

// Revenue analytics (daily/weekly/monthly/yearly)
exports.getRevenueAnalytics = async (req, res) => {
  try {
    const { period } = req.query;

    let groupFormat;
    switch (period) {
      case 'daily':
        groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$saleDate' } };
        break;
      case 'weekly':
        groupFormat = { $isoWeek: '$saleDate' };
        break;
      case 'monthly':
        groupFormat = { $dateToString: { format: '%Y-%m', date: '$saleDate' } };
        break;
      case 'yearly':
        groupFormat = { $year: '$saleDate' };
        break;
      default:
        return res.status(400).json({ message: 'Invalid period. Use daily, weekly, monthly, yearly.' });
    }

    const revenue = await Sale.aggregate([
      {
        $group: {
          _id: groupFormat,
          totalRevenue: { $sum: '$saleAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: 'Error generating revenue report', error });
  }
};
