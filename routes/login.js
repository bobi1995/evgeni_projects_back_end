const express = require("express");
const UserModel = require("../mongoModels/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.send("User does not exists");
  }
  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return res.send("Password is incorrect");
  }

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
  });
});

module.exports = router;
