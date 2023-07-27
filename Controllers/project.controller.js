const Project = require("../Models/project");
const Inventory = require("../Models/inventory");
const Contractor = require("../Models/contractor");
const Orders = require("../Models/orders")


exports.createProject = async (req, res) => {
  try {
    //A METHOD THAT CREATES A NEW PROJECT
    const newInventory = await Inventory.create({})
    const newContractor = await Contractor.create({})
    const newOrders = await Orders.create({})
    const { name, startingDate, finishDate, projectManager } = req.body;
    const newProject = await Project.create({
      name,
      startingDate,
      finishDate,
      projectManager,
      inventory: newInventory._id,
      contractors: newContractor._id,
      projectOrders: newOrders._id
    });

    res.status(201).json(newProject);
  } catch {
    res.status(401).send("Couldn't create a new project");
  }
};

exports.deleteProject = async (req, res) => {
  try {
    //A METHOD THAT DELETES A PROJECT
    const projectId = req.header("projectId");
    await Project.findByIdAndDelete(projectId);

    res.status(201).json("successfully deleted");
  } catch {
    res.status(401).send("Couldn't delete this project");
  }
};

exports.getProjectById = async (req, res) => {
  try {
    //A METHOD THAT RETURNS A PROJECT OBJ
    const projectId = req.header("projectId");
    const project = await Project.findById(projectId)
    res.status(200).json(project);
  } catch {
    res.status(401).send("Couldn't find this project");
  }
};
