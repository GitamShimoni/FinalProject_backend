const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String },
  contractors: [{ type: mongoose.Types.ObjectId, ref: "Contractor" }],
  projectOrders: { type: mongoose.Types.ObjectId, ref: "Orders" },
  inventory: [{ type: mongoose.Types.ObjectId, ref: "Inventory" }],
  startingDate: { type: Date },
  finishDate: { type: Date },
  projectManager: { type: String },
});

module.exports = mongoose.model("Project", projectSchema);
