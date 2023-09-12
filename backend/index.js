const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const pinRoute = require("../backend/routes/pins");
app.use(express.json());
// console.log(process.env.REACT_APP_MONGO_URL);

mongoose
  .connect(process.env.REACT_APP_MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
