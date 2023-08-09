const express = require("express");
const router = express.Router();
const endDayController = require("../Controllers/endDay.controller");

router.route("/createEndDay").post(endDayController.createEndDay);
router.route("/getLatestEndDay").post(endDayController.getLatestEndDay);

module.exports = router;
