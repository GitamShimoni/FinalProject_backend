const mongoose = require("mongoose");
const CashFlow = require("../Models/CashFlow");
const Project = require("../Models/project");

const createCashFlow = async (req, res) => {
  const projectId = req.header("projectId");
  console.log(projectId);
  console.log("eggegeg");

  try {
    const newCashFlow = await CashFlow.create({});
    console.log(newCashFlow);
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { cashFlow: newCashFlow._id }, 
      { new: true }
    );

    res.status(201).json({ newCashFlow, updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).send("Create Failed");
  }
};

const getCashFlow = async (req, res) => {
  const projectId = req.header("projectId");
  console.log(projectId);

  try {
    const project = await Project.findById(projectId)
    
    console.log(project.cashFlow);
    res.status(201).json(project.cashFlow);
  } catch (error) {
    console.error(error);
    res.status(500).send("get Failed");
  }
};

module.exports = {
  createCashFlow,
  getCashFlow,
};
