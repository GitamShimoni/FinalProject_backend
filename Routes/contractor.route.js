const contractorService = require("../Controllers/contractor.controller");
const express = require("express");

const router = express.Router();

router.route("/create").post(contractorService.createContractor);
router.route("/add").post(contractorService.addServiceToConstractor);

module.exports = router;
