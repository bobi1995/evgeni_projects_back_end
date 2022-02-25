const express = require("express");
const UserModel = require("../mongoModels/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

//get all users
router.get("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const user = await UserModel.find();

  return res.send(user);
});

//get individual user
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

//add user
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
      return res.send(err);
    });
});

//edit user
router.post("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }

  const user = await UserModel.findById(req.body.userId);
  if (!user) {
    return res.status(201).send("User does not exist");
  }
  try {
    await UserModel.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          isAdmin: req.body.type,
        },
      }
    );
    return res.status(200).send("Updated!");
  } catch (error) {
    return res.status(201).send("Unsuccessfull update");
  }
});

module.exports = router;
