const contractorService = require("../Controllers/contractor.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(contractorService.createContractor);
router.route("/delete").post(contractorService.deleteContractor);
router.route("/editService").patch(contractorService.editContractorService);
router.route("/add").post(contractorService.addServiceToContractor);
router.route("/deleteService").post(contractorService.deleteContractorService);
router.route("/getAllContractor").post(contractorService.getAllContractors)
router.route("/getAllServices").post(contractorService.getAllServicesByContractorId)
router.route("/addServicesArr").post(contractorService.addServiceArrToContractor)
  

module.exports = router; 
