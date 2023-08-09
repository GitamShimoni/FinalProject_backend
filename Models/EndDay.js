const mongoose = require("mongoose");

const endDaySchema = new mongoose.Schema({
  summary: {Type: Object},
  // summary: {
    // contractors: [
    //   {
    //     conName: { type: String },
    //     howManyWorkers: { type: String },
    //     services: [
    //       {
    //         serviceName: { type: String },
    //         sectionInContract: { type: String },
    //         status: { type: String },

    //         whatWasDone: { type: String },
    //         unitOfMeasurement: { type: String },
    //       },
    //     ],
    //   }, 
    // ],
    // materialUsed: [{ name: { type: String }, quantity: { type: Number } }],
  // },
});

module.exports = mongoose.model("EndDay", endDaySchema);
