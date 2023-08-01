const authenticateService = require("../Controllers/authenticate.controller");
const express = require("express");

const router = express.Router();

router.route("/login").post(authenticateService.login);

router.route("/register").post(authenticateService.register);

module.exports = router;
