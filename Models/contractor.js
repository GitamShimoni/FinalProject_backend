const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
  name: { type: String },
  services: [{ type: mongoose.Types.ObjectId, ref: "Service" }],
});

module.exports = mongoose.model("Contractor", contractorSchema);
