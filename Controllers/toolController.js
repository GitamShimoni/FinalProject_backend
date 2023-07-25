const Project = require("../Models/project");
const Tool = require("../Models/tool");

const Inventory = require("../Models/inventory");

const createTool = async (req, res) => {
  try {
    // SHOULD GET ID OF THE INVENTORY
    const projectId = req.headers.projectid;
    console.log(projectId);
    const { ...rest } = req.body;
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const inventory = await Inventory.findById(project.id);
      if (!inventory) {
        return res.status(404).json({ error: "Inventory not found" });
      }

      const newTool = await Tool.create(rest);
      const updateInventory = await Inventory.findByIdAndUpdate(
        project.id,
        { $push: { tools: newTool } },
        { new: true } // Add the 'new' option to get the updated document
      ).populate("tools");

      res.status(200).json(updateInventory);
    } catch (err) {
      res.status(401).json({ error: "Authentication failed" });
    }
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};
const updateTool = async (req, res) => {
  try {
    const { toolId, toolName, takenBy, signed, date } = req.body;
    const updatedTool = Tool.findByIdAndUpdate(toolId, {
      toolName,
      takenBy,
      signed,
      date,
    });
    res.status(201).json(updatedTool);
  } catch {
    res.status(500).json("Couldn't update the tool");
  }
};

// const deleteTool = async {req, res} => {}
module.exports = { createTool, updateTool };
