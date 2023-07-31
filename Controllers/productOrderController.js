const Project = require("../Models/project");
const ProductOrder = require("../Models/productOrder");
const Orders = require("../Models/orders");

const createProductOrder = async (req, res) => {
  try {
    //A FUNCTION THAT CREATES A NEW PRODUCT ORDER AND PUSHES IT TO A SPECIFIC "ORDERS"
    const { ordersId, productName, unit, dateOfOrder, quantity, status } =
      req.body;
    const orders = await Orders.findById(ordersId);
    if (!orders) {
      return res.status(404).json({ error: "Orders not found" });
    }
    const newProductOrder = await ProductOrder.create({
      ordersId,
      productName,
      dateOfOrder,
      quantity,
      status,
      unit,
    });
    const updateOrders = await Orders.findByIdAndUpdate(
      ordersId,
      { $push: { productOrders: newProductOrder } },
      { new: true }
    );
    res.status(200).json(newProductOrder.data);
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};
const getProductOrder = async (req, res) => {
  try {
    const productOrderId = req.body.productOrderId;
    console.log(productOrderId);
    const productOrder = await ProductOrder.findById(productOrderId);

    if (productOrder) {
      res.status(200).json(productOrder);
    } else {
      res.status(404).json("wasn't able to find order or orders");
    }
  } catch {
    res.status(500).json("fuck");
  }
};
const getAllProductOrders = async (req, res) => {
  const { ordersId } = req.body;
  console.log(ordersId);
  try {
    const orders = await Orders.findById(ordersId).populate("productOrders");
    // orders.populate("productOrders");
    console.log(orders);
    if (orders && orders.productOrders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json("wasn't able to find iron order or orders");
    }
  } catch {
    res.status(500).json("fuck");
  }
};

const updateProductOrder = async (req, res) => {
  try {
    const productOrderId = req.body.productOrderId;
    const updatedProductOrder = await ProductOrder.findByIdAndUpdate(
      productOrderId,
      {
        status: req.body.status,
      },
      { mew: true }
    );
    res.status(201).json(updatedProductOrder);
  } catch {
    res.status(500).json("Couldn't update the order");
  }
};
module.exports = {
  createProductOrder,
  getProductOrder,
  getAllProductOrders,
  updateProductOrder,
};
