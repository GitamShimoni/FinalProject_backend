const authenticateService = require("../Controllers/authenticate.controller");
const express = require("express");

const router = express.Router();

router.route("/authenticate").post(authenticateService.login);

module.exports = router;
