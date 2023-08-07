const express = require("express");
const router = express.Router();
const endDayController = require("../controllers/endDayController");

// router.route("/create").post(contractorService.createContractor);
// router.route("/editService").patch(contractorService.editContractorService);
// router.route("/add").post(contractorService.addServiceToContractor);
// router.route("/getAllServices").post(contractorService.getAllServicesByContractorId)
// router.route("/addServicesArr").post(contractorService.addServiceArrToContractor)
router.route("/getAllContractor").post(endDayController.getAllFormContractors)
router.route("/createContractorForm").post (endDayController.createContractorForm);


module.exports = router; 
