const express = require("express");
const router = express.Router();
const toolController = require("../Controllers/toolController");

router.post("/createTool", toolController.createTool);
// router.get("/fetchTool", toolController.fetchTool);
 router.patch("/updateTool", toolController.updateTool);
// router.delete("deleteTool", toolController.deleteTool);
module.exports = router;
