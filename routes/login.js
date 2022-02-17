const express = require("express");
const UserModel = require("../mongoModels/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(201).send("User does not exists");
  }
  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return res.status(201).send("Password is incorrect");
  }

  console.log(user);

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    "somesupersecretkey"
  );

  return res.send({
    userId: user._id,
    token,
    admin: user.isAdmin,
  });
});

module.exports = router;
