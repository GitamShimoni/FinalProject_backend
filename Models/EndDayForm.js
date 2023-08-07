const mongoose = require("mongoose");

const endDayFormSchema = new mongoose.Schema({
  contractorId: {type: String},
  contractorServiceForms: [{ type: mongoose.Types.ObjectId, ref: "ContractorServiceForm" }],
});

module.exports = mongoose.model("EndDayForm", endDayFormSchema);