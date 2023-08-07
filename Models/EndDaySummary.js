const mongoose = require("mongoose");

const endDaySummarySchema = new mongoose.Schema({
  date: { type: Date },
  comment: { type: String },
  contractorForms: [{ type: mongoose.Types.ObjectId, ref: "EndDayForm" }],
});

module.exports = mongoose.model("EndDaySummary", endDaySummarySchema);
