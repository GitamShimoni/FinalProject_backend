const EndDayForm = require("../Models/EndDayForm");
const EndDaySummary = require("../Models/EndDaySummary");
const ServiceForm = require("../Models/ContractorServiceForm");
const project = require("../Models/project");

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
    const { whatWasDone, employeeNum, status, contractSection, unitOfMeasurement, materialsUsed } = req.body;

    const newContractorServiceForm = await ServiceForm.create({
      whatWasDone,
      employeeNum,
      status,
      contractSection,
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
  getAllContractorServiceForms,
  getContractorServiceFormByContractorId,
  createContractorServiceForm
};
