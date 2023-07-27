const Project = require("../Models/project");
const IronOrder = require("../Models/ironOrder");
const Orders = require("../Models/orders");

const createIronOrder = async (req, res) => {
  try {
    //A FUNCTION THAT CREATES A NEW PRODUCT ORDER AND PUSHES IT TO A SPECIFIC "ORDERS"
    const {
      ordersId,
      ironName,
      requestedArrivalDate,
      arrivalDate,
      requestedQuantity,
      arrivedQuantity,
      status,
      reciptSrc,
    } = req.body;
    const orders = await Orders.findById(ordersId);
    console.log(
      ordersId,
      ironName,
      requestedArrivalDate,
      arrivalDate,
      requestedQuantity,
      arrivedQuantity,
      status,
      reciptSrc
    );
    if (!orders) {
      return res.status(404).json({ error: "Orders not found" });
    }
    const newIronOrder = await IronOrder.create({
      ordersId,
      ironName,
      dateOfOrder: new Date(),
      requestedArrivalDate,
      arrivalDate,
      requestedQuantity,
      arrivedQuantity,
      status,
      reciptSrc,
    });
    const updateOrders = await Orders.findByIdAndUpdate(
      ordersId,
      { $push: { ironOrders: newIronOrder } },
      { new: true }
    );
    res.status(200).json(updateOrders);
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};

const getIronOrder = async (req, res) => {
  try {
    const ironOrderId = req.body.ironOrderId;
    console.log(ironOrderId);
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
  console.log(ordersId);
  try {
    const orders = await Orders.findById(ordersId).populate("ironOrders")
    if (orders && orders.ironOrders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json("wasn't able to find iron oreder or orders");
    }
  } catch {
    res.status(500).json("fuck");
  }
};

const updateIronOrder = async (req, res) => {
  try {
    const ironOrderId = req.body.ironOrderId;
    const updatedIronOrder = await IronOrder.findByIdAndUpdate(
      ironOrderId,
      {
        arrivalDate: req.body.arrivalDate,
        arrivedQuantity: req.body.arrivedQuantity,
        status: req.body.status,
      },
      { mew: true }
    );
    res.status(201).json(updatedIronOrder);
  } catch {
    res.status(500).json("Couldn't update the order");
  }
};
module.exports = { createIronOrder, getIronOrder, getAllIronOrders, updateIronOrder };
