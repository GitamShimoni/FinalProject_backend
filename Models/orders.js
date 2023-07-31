const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  projectId: { type: String },
  ironOrders: [{ type: mongoose.Types.ObjectId, ref: "IronOrder" }],
  productOrders: [{ type: mongoose.Types.ObjectId, ref: "ProductOrder" }],
});

module.exports = mongoose.model("Orders", ordersSchema);
