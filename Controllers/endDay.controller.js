const EndDayForm = require("../Models/EndDayForm");
const EndDaySummary = require("../Models/EndDaySummary");
const ServiceForm = require("../Models/ContractorServiceForm");
const project = require("../Models/project");
const EndDay = require("../Models/EndDay");
const Inventory = require("../Models/inventory");
const Product = require("../Models/product");

const createEndDay = async (req, res) => {
  try {
    const { summary, projectId } = req.body; // Assuming "summary" is the object you receive in req.body
    summary.date = new Date();
    console.log(summary.contractorsArr, "This is what i get from the front");
    // Map contractorsArr to include necessary fields
    const contractorsArr = summary.contractorsArr.map((contractor) => {
      return {
        name: contractor.name,
        services: contractor.services.map((service) => {
          return {
            section: service.section,
            sectionName: service.sectionName,
            unit: service.unit,
            price: service.price,
            contractorId: service.contractorId,
            _id: service._id,
            WhatWasDone: service.WhatWasDone,
            status: service.status,
          };
        }),
        howManyWorkers: contractor.howManyWorkers,
        materialsUsed: contractor.materialsUsed,
      };
    });
    console.log(contractorsArr[0], "This is the updated object");
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
    console.log(newEndDay.contractorsArr[0].services, "THIS IS NEW END DAY");
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
    const ReturnedDay = await EndDay.findById(TheDay)
      // .populate({
      //   path: "contractorsArr.services", // Path to the services field
      //   model: "Service", // Model to populate with
      // })
      .populate({
        path: "contractorsArr.materialsUsed", // Path to the materialsUsed field
        model: "Product", // Model to populate with
      })
      .exec();

    res.status(200).json(ReturnedDay);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while getting all Contractor Service Forms",
    });
  }
};
const getLatestDayMaterialsUsed = async (req, res) => {
  const { projectId } = req.body;
  try {
    const currentProject = await project.findById(projectId);
    const TheDay = currentProject.days[currentProject.days.length - 1];
    const ReturnedDay = await EndDay.findById(TheDay)

      .populate({
        path: "contractorsArr.materialsUsed", // Path to the materialsUsed field
        model: "Product", // Model to populate with
      })
      .exec();
    console.log(ReturnedDay, "This is the returned day");
    const inputArray = ReturnedDay.allMaterialsUsed;
    const aggregatedArray = [];
    const nameMap = new Map();

    inputArray.forEach((item) => {
      if (nameMap.has(item.name)) {
        const existingItem = nameMap.get(item.name);
        existingItem.usedQuantity += parseFloat(item.usedQuantity);
      } else {
        const newItem = {
          name: item.name,
          unit: item.unit,
          usedQuantity: parseFloat(item.usedQuantity),
        };
        nameMap.set(item.name, newItem);
        aggregatedArray.push(newItem);
      }
    });

    res.status(200).json(aggregatedArray);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while getting all Contractor Service Forms",
    });
  }
};

const removeLastDayMaterials = async (req, res) => {
  //A method that finds out what the latest materials used are, and removes them from the inventory.
  const { projectId, inventoryId } = req.body;
  try {
    const currentProject = await project.findById(projectId);
    const TheDay = currentProject.days[currentProject.days.length - 1];
    const ReturnedDay = await EndDay.findById(TheDay)

      .populate({
        path: "contractorsArr.materialsUsed", // Path to the materialsUsed field
        model: "Product", // Model to populate with
      })
      .exec();
    console.log(ReturnedDay, "This is the returned day");
    const inputArray = ReturnedDay.allMaterialsUsed;
    const aggregatedArray = [];
    const nameMap = new Map();

    inputArray.forEach((item) => {
      if (nameMap.has(item.name)) {
        const existingItem = nameMap.get(item.name);
        existingItem.usedQuantity += parseFloat(item.usedQuantity);
      } else {
        const newItem = {
          name: item.name,
          unit: item.unit,
          usedQuantity: parseFloat(item.usedQuantity),
        };
        nameMap.set(item.name, newItem);
        aggregatedArray.push(newItem);
      }
    });

    //Got the materialsUsed, now run on the inventory, and remove the according materials from it
    console.log(aggregatedArray, "Thats the materials used");
    const currentInventory = await Inventory.findById(inventoryId).populate(
      "products"
    );
    const inventoryProductsArray = currentInventory.products;
    console.log(inventoryProductsArray, "THATS THE InventoryProductsArray");
    const newInventoryProducts = await updateMaterials(
      inventoryProductsArray,
      aggregatedArray
    );

    console.log(newInventoryProducts, "THATS THE newInventoryProducts");

    // const updatedInventory = await Inventory.findByIdAndUpdate(inventoryId, {
    //   products: newInventoryProducts,
    // });

    // console.log(updatedInventory, "THATS THE updatedInventory");

    res.status(200).json(newInventoryProducts);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while getting all Contractor Service Forms",
    });
  }
};

async function updateMaterials(currentMaterials, materialsUsed) {
  for (const usedMaterial of materialsUsed) {
    const { name, usedQuantity } = usedMaterial;

    const existingMaterialIndex = currentMaterials.findIndex(
      (material) => material.name === name
    );

    if (existingMaterialIndex !== -1) {
      const existingQuantity = currentMaterials[existingMaterialIndex].quantity;
      if (existingQuantity >= usedQuantity) {
        currentMaterials[existingMaterialIndex].quantity -= usedQuantity;
        if (currentMaterials[existingMaterialIndex].quantity === 0) {
          const materialId = currentMaterials[existingMaterialIndex]._id;
          currentMaterials.splice(existingMaterialIndex, 1);

          // Update the value in the database
          await Product.findByIdAndUpdate(materialId, {
            quantity: 0,
          });
        } else {
          const materialId = currentMaterials[existingMaterialIndex]._id;

          // Update the value in the database
          await Product.findByIdAndUpdate(materialId, {
            quantity: currentMaterials[existingMaterialIndex].quantity,
          });
        }
      } else {
        console.log(`Not enough ${name} in inventory.`);
      }
    } else {
      console.log(`${name} not found in inventory.`);
    }
  }

  return currentMaterials;
}

module.exports = {
  getLatestEndDay,
  createEndDay,
  getLatestDayMaterialsUsed,
  removeLastDayMaterials,
};

// function updateMaterials(currentMaterials, materialsUsed) {
//   for (const usedMaterial of materialsUsed) {
//     const { name, usedQuantity } = usedMaterial;

//     const existingMaterialIndex = currentMaterials.findIndex(
//       (material) => material.name === name
//     );

//     if (existingMaterialIndex !== -1) {
//       const existingQuantity = currentMaterials[existingMaterialIndex].quantity;
//       if (existingQuantity >= usedQuantity) {
//         currentMaterials[existingMaterialIndex].quantity -= usedQuantity;
//         if (currentMaterials[existingMaterialIndex].quantity === 0) {
//           currentMaterials.splice(existingMaterialIndex, 1);
//         }
//       } else {
//         console.log(`Not enough ${name} in inventory.`);
//       }
//     } else {
//       console.log(`${name} not found in inventory.`);
//     }
//   }

//   return currentMaterials;
// }
