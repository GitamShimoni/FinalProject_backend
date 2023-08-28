const mongoose = require("mongoose");

const cashFlowSchema = new mongoose.Schema({
  projectId: { type: String },
  ordersCosts: [
    {
        productName: {type: String},
        quantity: {type: Number},
        supplier: {type: String},
        price: {type: Number},
        date: {type: Date},
    }
  ],
  paymentForContractors: [
    {
        contractorName: {type: String},
        serviceName: {type: String},
        quantity: {type: Number},
        price: {type: Number},
        date: {type: Date}
    }
  ],

  ProductTotal: {type: Number},
  ServicesTotal: {type: Number},
  Total: {type: Number},
});

module.exports = mongoose.model("CashFlow", cashFlowSchema);
