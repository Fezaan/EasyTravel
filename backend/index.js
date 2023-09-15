const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const cors = require("cors");
app.use(express.json());
app.use(cors());

// console.log(process.env.REACT_APP_MONGO_URL);
// app.get("/",  (req,res)=>{
//   res.send("Helo");
//   console.log("Req recieved");
// })
mongoose
  .connect(process.env.REACT_APP_MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
