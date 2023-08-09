const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
  date: {type: Date},
  serviceForms: { type: mongoose.Types.ObjectId, ref: "ContractorServiceForm" },
});

module.exports = mongoose.model("Contractor", contractorSchema);