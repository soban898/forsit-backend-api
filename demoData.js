
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Inventory = require('./models/Inventory');
const Sale = require('./models/Sale');

dotenv.config();

const demo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Inventory.deleteMany();
    await Sale.deleteMany();

    const products = await Product.insertMany([
      { name: 'Echo Dot', category: 'Electronics', brand: 'Amazon', price: 49.99, sku: 'ED001' },
      { name: 'Wireless Mouse', category: 'Accessories', brand: 'Logitech', price: 25.0, sku: 'WM002' },
    ]);

    await Inventory.insertMany([
      { product: products[0]._id, quantity: 10 },
      { product: products[1]._id, quantity: 3 },
    ]);

    await Sale.insertMany([
      { product: products[0]._id, quantitySold: 2, saleAmount: 99.98, platform: 'Amazon' },
      { product: products[1]._id, quantitySold: 1, saleAmount: 25.0, platform: 'Walmart' },
    ]);

    console.log('✅ Demo data inserted');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

demo();
