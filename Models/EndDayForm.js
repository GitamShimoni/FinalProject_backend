const mongoose = require("mongoose");

const endDayFormSchema = new mongoose.Schema({
  whatWasDone: { type: String },
  employeeNum: { type: Number },
  status: {type: String},
  contractSection: {type: String},
  unitOfMeasurement : {type: String},
  quantity: {type: Number},
  contractorId: {type: String}
});

module.exports = mongoose.model("EndDayForm", endDayFormSchema);
