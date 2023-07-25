const mongoose = require("mongoose");

const ironOrderSchema = new mongoose.Schema({
  ironName: { type: String },
  dateOfOrder: { type: Date },
  requestedArrivalDate: { type: Date },
  arrivalDate: { type: Date },
  requestedQuantity: { type: Number },
  arrivedQuantity: { type: Number },
  status: { type: String },
  reciptSrc: { type: String },
});

module.exports = mongoose.model("IronOrder", ironOrderSchema);