const express = require("express");
const UserModel = require("../mongoModels/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const user = await UserModel.find();

  return res.send(user);
});

router.get("/:userId", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const user = await UserModel.findById(req.params.userId)
    .populate("userCost")
    .populate("results")
    .populate("projects");
  if (!user) {
    res.send("User does not exist");
  }
  return res.send(user);
});

router.post("/add", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const exist = await UserModel.findOne({ email: req.body.email });
  if (exist) {
    return res.send("User already exists");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
  });
  return user
    .save()
    .then((res) => res._id)
    .then((id) => res.send(id))
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
