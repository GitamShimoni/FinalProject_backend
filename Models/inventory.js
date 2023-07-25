const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  tools: [{ type: mongoose.Types.ObjectId, ref: "Tool" }],
  irons: [{ type: mongoose.Types.ObjectId, ref: "Iron" }],
});

module.exports = mongoose.model("Inventory", inventorySchema);
