const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middleware = require("./middleware");

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "goodbye world",
  });
});

app.use(middleware.notFound);

app.use(middleware.errorHandler);

app.listen(1337, () => {
  console.log("Server started");
});
