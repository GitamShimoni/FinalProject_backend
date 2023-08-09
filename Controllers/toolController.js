const Project = require("../Models/project");
const Tool = require("../Models/tool");

const Inventory = require("../Models/inventory");
const { sign } = require("jsonwebtoken");

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

      const inventory = await Inventory.findById(project.inventory);
      // console.log(inventory);
      // console.log(project, "hjghjgjhgjhgjh");
      if (!inventory) {
        return res.status(404).json({ error: "Inventory not found" });
      }

      const newTool = await Tool.create(rest);
      const updateInventory = await Inventory.findByIdAndUpdate(
        project.inventory,
        { $push: { tools: newTool } },
        { new: true }
      ).populate("tools");

      res.status(200).json(updateInventory);
    } catch (err) {
      res.status(401).json({ error: "Authentication failed" });
    }
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};
const updateToolTaken = async (req, res) => {
  try {
    const { toolId, toolName, takenBy, signed } = req.body;
    // console.log(toolId);
    const updatedTool = await Tool.findOneAndReplace(
      { _id: toolId },
      {
        toolName: toolName,
        takenBy: takenBy,
        signed: signed,
        date: new Date(),
      }
    );
    const theTool = await Tool.findById(updatedTool._id);
    res.status(201).json(theTool);
  } catch {
    res.status(500).json("Couldn't update the tool");
  }
};

// const deleteTool = async (req, res) => {
//   try {
//     const toolId = req.body.toolId;
//     await Tool.findByIdAndDelete(toolId);
//     res.status(200).json({ message: "Tool deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Couldn't delete the tool", details: err });
//   }
// };
const deleteTool = async (req, res) => {
  // console.log(req.body.toolId);
  try {
    const toolId = req.body.toolId;
    const deletedTool = await Tool.findByIdAndDelete(toolId);
    // console.log(deletedTool);
    if (!deletedTool) {
      return res.status(404).json({ error: "Tool not found" });
    }
    // console.log(deletedTool, "This tool has been deleted");
    res.status(200).json({ message: "Tool deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Couldn't delete the tool", err });
  }
};

const getTool = async (req, res) => {
  try {
    // console.log(req.body, "This is the body");
    const { toolId } = req.body;
    // console.log(toolId);
    const tool = await Tool.findById(toolId);

    if (tool) {
      res.status(200).json(tool);
    } else {
      res.status(404).json("wasn't able to find tool or tools");
    }
  } catch {
    res.status(500).json("fuck");
  }
};

const getAllTools = async (req, res) => {
  const { inventoryId } = req.body;
  // console.log(inventoryId);
  try {
    const inventory = await Inventory.findById(inventoryId).populate("tools");
    // console.log(inventory, "This is the inventory");
    if (inventory && inventory.tools) {
      res.status(200).json(inventory.tools);
    } else {
      res.status(404).json("wasn't able to find tool or tools");
    }
  } catch {
    res.status(500).json("fuck");
  }
};

const updateTool = async (req, res) => {
  try {
    const { toolId, toolName } = req.body;
    // console.log(toolId);
    const updatedTool = await Tool.findOneAndReplace(
      { _id: toolId },
      {
        toolName: toolName,
      }
    );
    const TheTool = await Tool.findById(updatedTool._id);
    res.status(201).json(TheTool);
  } catch {
    res.status(500).json("Couldn't update the tool");
  }
};
module.exports = {
  createTool,
  updateTool,
  updateToolTaken,
  deleteTool,
  getTool,
  getAllTools,
};
