const contractorService = require("../Controllers/contractor.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(contractorService.createContractor);
router.route("/delete").delete(contractorService.deleteContractor);
router.route("/editService").patch(contractorService.editContractorService);
router.route("/add").post(contractorService.addServiceToContractor);
router.route("/deleteService").delete(contractorService.deleteContractorService);
router.route("/getAllContractor").post(contractorService.getAllContractors)
  

module.exports = router; 
