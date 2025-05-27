const Inventory = require('../models/Inventory');
// const Product = require('../models/Product');

//  View full inventory
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error });
  }
};

//  Update inventory quantity
exports.updateInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const inventory = await Inventory.findOne({ product: productId });

    if (inventory) {
      inventory.quantity = quantity;
      inventory.lastUpdated = Date.now();
      await inventory.save();
    } else {
      const newInventory = new Inventory({ product: productId, quantity });
      await newInventory.save();
    }

    res.status(200).json({ message: 'Inventory updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error });
  }
};

// Get low stock products (threshold = 5)
exports.getLowStock = async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({ quantity: { $lte: 5 } }).populate('product');
    res.json(lowStockItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock items', error });
  }
};
