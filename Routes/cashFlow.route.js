const cashFlow = require("../Controllers/cashFlow.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(cashFlow.createCashFlow);
router.route("/get").post(cashFlow.getCashFlow);
router.route("/createOrderCost").post(cashFlow.createOrderCost);

  

module.exports = router; 
