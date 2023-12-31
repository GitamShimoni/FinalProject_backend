const Project = require("../Models/project");
const IronOrder = require("../Models/ironOrder");
const Orders = require("../Models/orders");

const createIronOrder = async (req, res) => {
  try {
    //A FUNCTION THAT CREATES A NEW PRODUCT ORDER AND PUSHES IT TO A SPECIFIC "ORDERS"
    const {
      ordersId,
      ironName,
      dateOfOrder,
      requestedArrivalDate,
      arrivalDate,
      requestedQuantity,
      arrivedQuantity,
      status,
      receiptSrc: receiptSrc,
      supplier,
      unit,
      minQuantity,
    } = req.body;
    // console.log(minQuantity, "min quantity !!!!!!!");
    const orders = await Orders.findById(ordersId);
    if (!orders) {
      return res.status(404).json({ error: "Orders not found" });
    }

    const newIronOrder = await IronOrder.create({
      ordersId,
      ironName,
      dateOfOrder,
      requestedArrivalDate,
      arrivalDate,
      requestedQuantity,
      arrivedQuantity,
      status,
      receiptSrc: receiptSrc,
      supplier,
      unit,
      minQuantity: minQuantity,
    });
    // console.log(newIronOrder);
    const updateOrders = await Orders.findByIdAndUpdate(
      ordersId,
      { $push: { ironOrders: newIronOrder } },
      { new: true }
    );
    const newupdateOrders = await Orders.findById(updateOrders._id).populate(
      "ironOrders"
    );
    res.status(200).json(newupdateOrders.ironOrders);
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};

const getIronOrder = async (req, res) => {
  try {
    const ironOrderId = req.body.ironOrderId;
    // console.log(ironOrderId);
    const ironOrder = await IronOrder.findById(ironOrderId);

    if (ironOrder) {
      res.status(200).json(ironOrder);
    } else {
      res.status(404).json("wasn't able to find order or orders");
    }
  } catch {
    res.status(500).json("fuck");
  }
};
const getAllIronOrders = async (req, res) => {
  const { ordersId } = req.body;
  // console.log(ordersId);
  try {
    const orders = await Orders.findById(ordersId).populate("ironOrders");
    if (orders && orders.ironOrders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json("wasn't able to find iron order or orders");
    }
  } catch {
    res.status(500).json("fuck");
  }
};

const updateIronOrder = async (req, res) => {
  try {
    const { IronOrderId, changeStatus, arrivalDate, arrivedQuantity } =
      req.body;
    // console.log(IronOrderId, changeStatus, arrivalDate, arrivedQuantity);
    const updatedIronOrder = await IronOrder.findByIdAndUpdate(
      IronOrderId,
      {
        arrivalDate: arrivalDate,
        arrivedQuantity: arrivedQuantity,
        status: changeStatus,
      },
      { new: true }
    );
    // console.log(updatedIronOrder);
    const newIronOrder = await IronOrder.findById(IronOrderId);
    res.status(201).json(newIronOrder);
  } catch {
    res.status(500).json("Couldn't update the order");
  }
};

module.exports = {
  createIronOrder,
  getIronOrder,
  getAllIronOrders,
  updateIronOrder,
};
