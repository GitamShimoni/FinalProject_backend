const mongoose = require("mongoose");

const contractorServiceFormSchema = new mongoose.Schema({
  whatWasDone: { type: String },
  employeeNum: { type: Number },
  status: {type: String},
  contractSection: {type: String},
  unitOfMeasurement : {type: String},
  materialsUsed : {type: Object}
 });

module.exports = mongoose.model("ContractorServiceForm", contractorServiceFormSchema);