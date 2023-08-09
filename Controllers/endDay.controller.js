const EndDayForm = require("../Models/EndDayForm");
const EndDaySummary = require("../Models/EndDaySummary");
const ServiceForm = require("../Models/ContractorServiceForm");
const project = require("../Models/project");
const EndDay = require("../Models/EndDay");



const createEndDay = async (req, res) => {
  try {
    //needs to get an array of contractors,  numberOfEmployees, conName, services [serviceName, sectionInContract, status, whatWasDone, unitOfMeasuremenet], materialsUsed[{name, quantity}]

    //GETS FROM THE FRONT:
    //[{howManyWorkers,  name, services[{WhatWasDone, contractorId, price, section, sectionName, status, unit}], materialsUsed[{name, quantity}]       }]
    const { summary, projectId} = req.body;
    summary.date = new Date();
    console.log(summary, "This is the summary from the front end");
    const newEndDay = await EndDay.create({
     summary: summary
    });
    console.log(newEndDay, "THATS THE CREATED END DAY");
    const updateProject = await project.findByIdAndUpdate(projectId, { $push: { days: newEndDay } },
      { new: true }
    )
    //NEEDDS TO PUSH IT TO THE PROJECT AS SERVICEFORMS
    console.log(updateProject, "THATS THE NEW PROJECTY");
    res.status(201).json({ message: "Contractor Service Form created successfully", updateProject });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the Contractor Service Form" });
  }
};

const getAllContractorServiceForms = async (req, res) => {
  const projectId = req.header("projectId");
  try {
    const allContractorServiceForms = await project.findById(projectId).populate(
      "serviceForms"
    );
    res.status(200).json(allContractorServiceForms);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while getting all Contractor Service Forms" });
  }
};

const getContractorServiceFormByContractorId = async (req, res) => {
  try {
    const contractorServiceForm = await ServiceForm.findById(contractorId);
    res.status(200).json(contractorServiceForm);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while getting the Contractor Service Form" });
  }
};


const createContractorServiceForm = async (req, res) => {
  try {
    const { contractor, conName,numberOfEmployees, services, whatWasDone, sectionInContract, status, serviceName, unitOfMeasurement, materialsUsed } = req.body;

    const newContractorServiceForm = await ServiceForm.create({
      whatWasDone,
      employeeNum,
      status,
      serviceName,
      unitOfMeasurement,
      materialsUsed
    });

    //NEEDDS TO PUSH IT TO THE PROJECT AS SERVICEFORMS
    res.status(201).json({ message: "Contractor Service Form created successfully", form: newContractorServiceForm });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the Contractor Service Form" });
  }
};



module.exports = {
  createEndDay,
  getAllContractorServiceForms,
  getContractorServiceFormByContractorId,
  createContractorServiceForm
};
