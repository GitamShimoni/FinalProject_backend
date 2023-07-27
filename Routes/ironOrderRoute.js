const express = require("express");
const router = express.Router();
const ironOrderController = require("../Controllers/ironOrderController");

router.post('/createIronOrder', ironOrderController.createIronOrder)
router.post('/getIronOrder', ironOrderController.getIronOrder)
router.post('/getAllIronOrders', ironOrderController.getAllIronOrders)
router.patch('/updateIronOrder', ironOrderController.updateIronOrder)

module.exports = router;