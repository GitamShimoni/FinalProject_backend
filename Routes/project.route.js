const projectService = require("../Controllers/project.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(projectService.createProject);
router.route("/createOrders").post(projectService.createProjectOrders);
router.route("/delete").delete(projectService.deleteProject);
router.route("/get").get(projectService.getProjectById);
router.route("/getAll").get(projectService.getAllProjects);

module.exports = router;
