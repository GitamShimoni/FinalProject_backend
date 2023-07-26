const ProductOrder = require("../Models/productOrder");
const Order = require("../Models/order");
const Project = require("../Models/project");

exports.createProductOrder = async (req, res) => {
  try {
    //A METHOD THAT CREATES A NEW PRODUCT ORDER
    const { productName, dateOfOrder, quantity, status } = req.body;
    const projectId = req.header("projectId");

    const newProductOrder = await ProductOrder.create({
      productName,
      dateOfOrder,
      quantity,
      status,
    });

    const updateOrders = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: { orders: newProductOrder._id },
      },
      { new: true }
    );

    res.status(201).json(newProductOrder);
  } catch {
    res.status(401).send("Couldn't create a new project");
  }
};

exports.editProductOrder = async (req, res) => {
  try {
    //A METHOD THAT EDITS A PROJECT OBJ
    const projectId = req.header("projectId");
    const { productOrderId, productName, dateOfOrder, quantity, status } =
      req.body;

    const editedProductOrder = await ProductOrder.findByIdAndUpdate(
      productOrderId,
      {
        productName,
        dateOfOrder,
        quantity,
        status,
      }
    );
    res.status(200).json(editedProductOrder);
  } catch {
    res.status(401).send("Couldn't find this project");
  }
};

exports.deleteProductOrder = async (req, res) => {
  try {
    //A METHOD THAT DELETE A PROJECT OBJ
    const projectId = req.header("projectId");
    const {productOrderId, productName, dateOfOrder, quantity, status } =
      req.body;

    await ProductOrder.findByIdAndDelete(productOrderId);

    // const deleteProductOrder = await Project.findByIdAndUpdate(
    //     projectId,
    //   {
    //     $pull: { productOrders: { $in: req.body.cvid } },
    //   },
    //   { new: true }
    // );
    res.status(200).json("deleted successfully");
  } catch {
    res.status(401).send("Couldn't find this project");
  }
};
