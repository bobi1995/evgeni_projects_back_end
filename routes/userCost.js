const express = require("express");
const ProjectModel = require("../mongoModels/project");
const UserModel = require("../mongoModels/user");
const router = express.Router();
const UserCostModel = require("../mongoModels/userCost");

//add user cost
router.post("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const user = await UserModel.findById(req.body.userId);
  if (!user) {
    res.status(201).send("User does not exists");
  } else {
    const userCost = new UserCostModel({
      salary: req.body.salary,
      others: req.body.others,
    });
    await userCost.save();
    user.userCost = userCost;
    await user.save();
    return res.status(200).send("Done");
  }
});

//edit row
router.put("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }

  const userCost = await UserCostModel.findById(req.body.userCostId);
  if (!userCost) {
    return res.status(201).send("User Cost not found");
  }
  const newOthers = userCost.others;
  newOthers.push(req.body.otherCost);
  try {
    const updatedUserCost = await UserCostModel.findOneAndUpdate(
      {
        _id: userCost._id,
      },
      {
        $set: {
          salary: req.body.salary,
          others: newOthers,
        },
      }
    );

    return res.status(200).send("Updated");
  } catch (error) {
    return res.status(201).send("Unsuccessfull update");
  }
});

//delete individual COST
router.delete("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const userCost = await UserCostModel.findById(req.body.userCostId);
  if (!userCost) {
    return res.status(400).send("Row could not be found");
  }

  const newCost = userCost.others;

  const index = newCost.indexOf(req.body.costData);
  if (index > -1) {
    newCost.splice(index, 1);
  }

  try {
    const updatedUserCost = await UserCostModel.findOneAndUpdate(
      {
        _id: userCost._id,
      },
      {
        $set: {
          others: newCost,
        },
      }
    );
    return res.status(200).send("Deleted");
  } catch (error) {
    return res.status(201).send("Unsuccessfull delete");
  }
});

module.exports = router;
