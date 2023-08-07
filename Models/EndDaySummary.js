const mongoose = require("mongoose");

const endDaySummarySchema = new mongoose.Schema({
  date: { type: Date }, 
  comment: { type: String },
  contractorForms: [{ type: mongoose.Types.ObjectId, ref: "EndDayForm" }],
  summaryId: {type: String}
});

module.exports = mongoose.model("EndDaySummary", endDaySummarySchema);
