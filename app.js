const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
var mongoose = require("mongoose");
var config = require("./config");
var cookieParser = require("cookie-parser");
const cors = require("cors");

// connect to mongoDB
mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo database");
});

mongoose.connection.on("error", (err) => {
  console.log("Error at mongoDB: " + err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(expressValidator());

app.use("/", authRoute);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
