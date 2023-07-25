const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const projectRouter = require("./Routes/project.route")
require("dotenv").config();

const { MONGOATLAS } = process.env;

mongoose
  .connect(MONGOATLAS, {})
  .then(() => {
    console.log("Successfully connected to the Server");
  })
  .catch((err) => {
    console.log("Unable to connect to the Server");
    console.error(err);
  });

app.use(cors(), express.json(), helmet(), cookieParser());
app.use("/project" ,projectRouter)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
