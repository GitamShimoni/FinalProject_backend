const mongoose = require("mongoose");

const endDaySchema = new mongoose.Schema({
  summary: {
    contractors: [
      {
        conName: { type: String },
        numberOfEmployees: { type: String },
        services: [
          {
            sectionName: { type: String },
            sectionInContract: { type: String },
            status: { type: String },
            whatWasDone: { type: String },
          },
        ],
      }, 
    ],
    materialUsed: [{ name: { type: String }, quantity: { type: Number } }],
  },
});

module.exports = mongoose.model("EndDay", endDaySchema);
