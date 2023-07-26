const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  projectId: { type: String },
  ironOrders: [{ type: mongoose.Types.ObjectId, ref: "ironOrder" }],
  productOrders: [{ type: mongoose.Types.ObjectId, ref: "productOrder" }],
});

module.exports = mongoose.model("Orders", ordersSchema);
