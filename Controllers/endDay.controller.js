const EndDayForm = require("../Models/EndDayForm");
const EndDaySummary = require("../Models/EndDaySummary");
const ServiceForm = require("../Models/ContractorServiceForm");
const project = require("../Models/project");
const EndDay = require("../Models/EndDay");

const createEndDay = async (req, res) => {
  try {
    const { summary, projectId } = req.body; // Assuming "summary" is the object you receive in req.body
    summary.date = new Date();
    // Map contractorsArr to include necessary fields
    const contractorsArr = summary.contractorsArr.map((contractor) => {
      return {
        name: contractor.name,
        services: contractor.services,
        howManyWorkers: contractor.howManyWorkers,
        materialsUsed: contractor.materialsUsed,
      };
    });

    // Map allMaterialsUsed to include necessary fields
    const allMaterialsUsed = summary.allMaterialsUsed.map((material) => {
      return {
        name: material.name,
        unit: material.unit,
        quantity: material.quantity,
        isIron: material.isIron,
        orderId: material.orderId,
        usedQuantity: material.usedQuantity,
      };
    });

    const newEndDay = new EndDay({
      contractorsArr,
      allMaterialsUsed,
      date: summary.date,
    });

    await newEndDay.save();
    const updateProject = await project.findByIdAndUpdate(
      projectId,
      { $push: { days: newEndDay } },
      { new: true }
    );
    res.status(201).json({ updateProject });
  } catch (error) {
    console.error("Error creating EndDay:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getLatestEndDay = async (req, res) => {
  const { projectId } = req.body;
  try {
    const currentProject = await project.findById(projectId);
    const TheDay = currentProject.days[currentProject.days.length - 1];
    const ReturnedDay = await EndDay.findById(TheDay);
    res.status(200).json(ReturnedDay);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while getting all Contractor Service Forms",
    });
  }
};

module.exports = {
  getLatestEndDay,
  createEndDay,
};
