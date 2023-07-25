const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema({
  productName: { type: String },
  dateOfOrder: { type: Date },
  quantity: { type: Number },
  status: { type: String },
});

module.exports = mongoose.model("ProductOrder", productOrderSchema);
