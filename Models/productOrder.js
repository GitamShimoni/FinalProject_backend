const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema({
  ordersId: { type: String },
  productName: { type: String },
  dateOfOrder: { type: Date },
  quantity: { type: Number },
  minQuantity: { type: Number },
  status: { type: String },
  supplier: { type: String },
  unit: { type: String },
});

module.exports = mongoose.model("ProductOrder", productOrderSchema);
