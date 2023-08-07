const express = require("express");
const router = express.Router();
const endDayController = require("../controllers/endDayController");

router.route("/getAllServiceForms").post (endDayController.getAllContractorServiceForms);
router.route("/getContractorServiceForm").post (endDayController.getContractorServiceFormByContractorId);
router.route("/createContractorServiceForm").post (endDayController.createContractorServiceForm);


module.exports = router; 
