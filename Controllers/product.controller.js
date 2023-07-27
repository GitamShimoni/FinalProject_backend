const Product = require("../Models/product");

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

exports.getAllProducts = async (req, res) => {
  try {
    //A METHOD THAT RETURNS A PRODUCT OBJ
    const products = await Product.find({});

    res.status(200).json(products);
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