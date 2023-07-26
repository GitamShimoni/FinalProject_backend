const express = require("express");
const router = express.Router();
const toolController = require("../Controllers/toolController");

router.post("/createTool", toolController.createTool);
 router.post("/getTool", toolController.getTool);
 router.post("/getAllTools", toolController.getAllTools);
 router.delete("/deleteTool", toolController.deleteTool);
 router.patch("/updateTool", toolController.updateTool);
module.exports = router;
