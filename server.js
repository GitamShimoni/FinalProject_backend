const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const toolRoute = require('./Routes/toolRoute')

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

app.use('/tools', toolRoute)

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
