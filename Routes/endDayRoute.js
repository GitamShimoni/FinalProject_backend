const express = require("express");
const router = express.Router();
const endDayController = require("../Controllers/endDay.controller");

router.route("/createEndDay").post(endDayController.createEndDay);
router.route("/getLatestEndDay").post(endDayController.getLatestEndDay);
router
  .route("/getLatestDayMaterialsUsed")
  .post(endDayController.getLatestDayMaterialsUsed);
router
  .route("/removeLastDayMaterials")
  .post(endDayController.removeLastDayMaterials);

module.exports = router;
