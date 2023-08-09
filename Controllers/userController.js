const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

require("dotenv").config();

const signup = async (req, res) => {
  try {
    const isExists = await User.findOne({ userName: req.body.userName });
    if (isExists) {
      return res.status(400).json(" user already exists");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  try {
    const isUser = await User.findOne({ userName: req.body.userName });
    // console.log(isUser);
    if (!isUser) {
      return res.status(400).json("user not found");
    }
    const isMatch = await bcrypt.compare(req.body.password, isUser.password);
    if (!isMatch) {
      return res.status(400).json("password incorect");
    }
    const token = jwt.sign({ id: isUser._id }, process.env.SECRET);
    return res.status(201).json({ token });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET);
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json("User not found");
    }

    // Check if the request body contains updated fields and update them
    if (req.body.phone) {
      const oldPhone = user.phoneNumber;
      const newPhone = req.body.phone;
      user.phoneNumber = user.phoneNumber.replace(oldPhone, newPhone);
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      user.password = hashedPassword;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const isToken = async (req, res) => {
  try {
    const isId = jwt.verify(req.body.token, process.env.SECRET);
    const user = await User.findOne({ _id: isId.id });
    if (!user) {
      return res.status(400).json("did not login");
    }
    // console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
const getAllUsers = async (req, res) => {
  try {
    //A METHOD THAT RETURNS ALL USERS
    const users = await User.find({});
    res.status(200).json(users);
  } catch {
    res.status(401).send("UF");
  }
};

const deleteUser = async (req,res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET);
    const deleteUser = User.findByIdAndDelete(id)
    if (!deleteUser) {
      res.status(401).json("couldnt delete the user")
    }
    res.status(201).json("user deleted successfully")
  } catch {
    res.status(401).json("fuck you")
  }
}
module.exports = { signup, login, isToken, updateUser, getAllUsers, deleteUser };
