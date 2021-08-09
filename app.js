const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const exceptionsRouter = require("./routes/exceptions");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger("dev"));

app.use("/api", exceptionsRouter);
app.listen(port, () =>
  console.log(`Server is up and ready to serve on port ${port}.`)
);
