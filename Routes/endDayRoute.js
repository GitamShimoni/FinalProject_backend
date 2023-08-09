const express = require("express");
const router = express.Router();
const endDayController = require("../Controllers/endDay.controller");


router.route("/createEndDay").post (endDayController.createEndDay);
router.route("/getAllServiceForms").post (endDayController.getAllContractorServiceForms);
router.route("/getContractorServiceForm").post (endDayController.getContractorServiceFormByContractorId);
router.route("/createContractorServiceForm").post (endDayController.createContractorServiceForm);


module.exports = router; 
