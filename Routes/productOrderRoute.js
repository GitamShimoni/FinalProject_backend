const express = require("express");
const router = express.Router();
const productOrderController = require("../Controllers/productOrderController");

router.post("/createProductOrder", productOrderController.createProductOrder);
router.post("/getProductOrder", productOrderController.getProductOrder);
router.post("/getAllProductOrders", productOrderController.getAllProductOrders);
router.post("/getAllIronOrders", productOrderController.getAllIronOrders);
router.patch("/updateProductOrder", productOrderController.updateProductOrder);

module.exports = router;
