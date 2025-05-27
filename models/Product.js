const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  sku: { type: String, unique: true, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

