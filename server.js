const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const contractorRouter = require("./Routes/contractor.route");
const projectRouter = require("./Routes/project.route")
const productOrderRoute = require("./Routes/productOrderRoute")
const ironOrderRoute = require("./Routes/ironOrderRoute")

require("dotenv").config();
const toolRoute = require('./Routes/toolRoute');
const productOrder = require("./Models/productOrder");

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


app.use("/contractor", contractorRouter);
app.use("/project" ,projectRouter)
app.use('/tools', toolRoute)
app.use('/productOrder', productOrderRoute)
app.use('/ironOrder', ironOrderRoute)



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
