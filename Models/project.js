const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String },
  contractors: [{ type: mongoose.Types.ObjectId, ref: "Contractor" }],
  projectOrders: { type: mongoose.Types.ObjectId, ref: "Orders" },
  inventory: [{ type: mongoose.Types.ObjectId, ref: "Inventory" }],
  days: [{ type: mongoose.Types.ObjectId, ref: "EndDay" }],
  startingDate: { type: Date },
  finishDate: { type: Date },
  projectManager: { type: String },
  serviceForms: [{ type: mongoose.Types.ObjectId, ref: "ContractorServiceForm" }],
  cashFlow: { type: mongoose.Types.ObjectId, ref: "CashFlow" }
});

module.exports = mongoose.model("Project", projectSchema);
