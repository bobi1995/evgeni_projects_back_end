const express = require("express");
const mongoose = require("mongoose");
const isAuth = require("./middlewares/isAuth");
const cors = require("cors");

//IMPORT ROUTES
const userRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const projectRoute = require("./routes/project");
const budgetRowRoute = require("./routes/budgetRow");
const userCostRoute = require("./routes/userCost");

const url = "mongodb://localhost:27017/project-system";
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(isAuth);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  return next();
});

app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/project", projectRoute);
app.use("/budget", budgetRowRoute);
app.use("/cost/", userCostRoute);
//routes
app.get("/", (req, res) => {
  res.send("Working");
});

//starting
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    require("./mongoModels/user");
    require("./mongoModels/project");
    require("./mongoModels/result");
    require("./mongoModels/rowsOfBudget");
    require("./mongoModels/userCost");
  })
  .then(() => app.listen(4001, () => console.log("listening")))
  .catch((err) => console.log(err));
