const mongoose = require("mongoose");

const endDaySchema = new mongoose.Schema({
  // summary: {Type: Object},
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

  contractorsArr: [
    {
      name: String,
      services: [String],
      howManyWorkers: String,
      materialsUsed: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
      ],
    },
  ],
  allMaterialsUsed: [
    {
      name: String,
      unit: String,
      quantity: Number,
      isIron: Boolean,
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      usedQuantity: String,
    },
  ],
  date: Date,
});
// });

module.exports = mongoose.model("EndDay", endDaySchema);
