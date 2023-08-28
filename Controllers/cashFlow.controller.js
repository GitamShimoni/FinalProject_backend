const mongoose = require("mongoose");
const CashFlow = require("../Models/CashFlow");
const Project = require("../Models/project");

// ordersCosts: [
//   {
//       productName: {type: String},
//       quantity: {type: Number},
//       supplier: {type: String},
//       price: {type: Number},
//       date: {type: Date},
//   }
// ]
// paymentForContractors: [
//   {
//       contractorName: {type: String},
//       serviceName: {type: String},
//       quantity: {type: Number},
//       price: {type: Number},
//       date: {type: Date}
//   }
// ],

// ProductTotal: {type: Number},
// ServicesTotal: {type: Number},
// Total: {type: Number},
// });

const createOrderCost = async (req, res) => {
  try {
    //A METHOD THAT CREATES A NEW ORDERCOST OBJECT, AND PUSHED IT TO THE ARRAY (WHEN AN ORDER IS SELECTED AS ARRIVED)
    const { projectId, productName, quantity, supplier, price } = req.body;
    console.log("GOT INTO THE FUNCTION");
    const date = new Date();
    const newOrdersCost = {productName:productName, quantity:quantity, supplier:supplier, price:price, date:date}
    console.log(newOrdersCost, "NEW ORDERS COST");
    const currentProject = await Project.findById(projectId).populate("cashFlow");
    console.log(currentProject, "This is the current project");
    const currentCashFlow = await CashFlow.findByIdAndUpdate(currentProject.cashFlow,
      { $push: { ordersCosts: newOrdersCost } },
      { new: true });

      //Change the totals-variables accordingly:
      if (currentCashFlow.ServicesTotal){
        currentCashFlow.ServicesTotal += price;
      }
      else{
        currentCashFlow.ServicesTotal = price;
      }
      if (currentCashFlow.Total){
        currentCashFlow.Total += price;
      }
      else{
        currentCashFlow.Total = price;
      }
      currentCashFlow.save();
    // console.log("This is the newInventory from the back");
    res.status(201).json(currentCashFlow);
  } catch {
    res.status(401).send("Couldn't create a new project");
  }
};


// --------------------------------------------


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
  createOrderCost
};
