const contractorProduct = require("../Controllers/product.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(contractorProduct.createProduct);
router.route("/delete").delete(contractorProduct.deleteProduct);
router.route("/getOne").get(contractorProduct.getProductById);
router.route("/getAll").post(contractorProduct.getAllProducts);
router.route("/edit").patch(contractorProduct.editProduct);

module.exports = router;
