const mongoose = require("mongoose");

const ironOrderSchema = new mongoose.Schema({
  ordersId: { type: String },
  ironName: { type: String },
  dateOfOrder: { type: Date },
  requestedArrivalDate: { type: Date },
  arrivalDate: { type: Date },
  requestedQuantity: { type: Number },
  arrivedQuantity: { type: Number },
  status: { type: String },
  receiptSrc: { type: String },
  unit: { type: String },
});

module.exports = mongoose.model("IronOrder", ironOrderSchema);
