const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await User.findOne({ username: req.body.username });
    if (!isUser) {
      return res.status(401).json({ message: "Invalid user or password" });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, isUser.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid user or password" });
      } else if (isMatch) {
        const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET);
        return res.json({ token });
      }
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({ username, password: hash });
  try {
    const registerExists = await User.findOne({ username: req.body.username });
    if (registerExists) {
      return res.status(400).json("User is already registered!");
    }
    await User.create(newUser);
    return res.status(200).send(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { login, register };
