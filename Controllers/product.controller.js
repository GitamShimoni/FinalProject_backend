const Product = require("../Models/product");
const Inventory = require("../Models/inventory")

exports.createProduct = async (req, res) => {
  try {
    //A METHOD THAT CREATES A NEW PRODUCT
    const { name, unit, quantity, minQuantity, isIron, orderId } = req.body;
    const newProduct = await Product.create({
      name,
      unit,
      quantity,
      minQuantity,
      isIron,
      orderId,
    });

    res.status(201).json(newProduct);
  } catch {
    res.status(401).send("Couldn't create a new project");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.body.productId;
    //A METHOD THAT DELETES A PRODUCT
    await Product.findByIdAndDelete(productId);

    res.status(201).json("successfully deleted");
  } catch {
    res.status(401).send("Couldn't delete this project");
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productID = req.body.productID;
    //A METHOD THAT RETURNS A PRODUCT OBJ
    const product = await Product.findById(productID);

    res.status(200).json(product);
  } catch {
    res.status(401).send("Couldn't find this project");
  }
};

exports.editProduct = async (req, res) => {
  try {
    //A METHOD THAT EDITS A PRODUCT OBJ
    const { productId, name, unit, quantity, minQuantity, isIron, orderId } =
      req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        unit,
        quantity,
        minQuantity,
        isIron,
        orderId,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch {
    res.status(401).send("Couldn't find this project");
  }
};

exports.getAllProducts = async (req, res) => {
  const { inventoryId } = req.body;
  console.log(inventoryId);
  try {
    const inventory = await Inventory.findById(inventoryId).populate("products");
    console.log(inventory, "This is the inventory");
    if (inventory && inventory.products) {
      res.status(200).json(inventory.products);
    } else {
      res.status(404).json("wasn't able to find product or products");
    }
  } catch {
    res.status(500).json("fuck");
  }
};