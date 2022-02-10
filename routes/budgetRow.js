const express = require("express");
const ProjectModel = require("../mongoModels/project");
const UserModel = require("../mongoModels/user");
const BudgetRowsModel = require("../mongoModels/rowsOfBudget");
const router = express.Router();
const fs = require("fs");
const localAddress = require("../globals/localAddess");

//add row
router.post("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const project = await ProjectModel.findById(req.body.projectId);

  if (!project) {
    return res.status(400).send("Project could not be found");
  }
  let difference;

  if (req.body.agreedPrice && req.body.singlePrice && req.body.quantity) {
    difference =
      req.body.agreedPrice * req.body.quantity -
      req.body.singlePrice * req.body.quantity;
  }

  const budgetRow = new BudgetRowsModel({
    position: req.body.position,
    size: req.body.size,
    quantity: req.body.quantity,
    singlePrice: req.body.singlePrice,
    totalPrice: req.body.singlePrice * req.body.quantity,
    // offerPath: req.body.offerPath,
    provider: req.body.provider,
    //invoice: req.body.invoice,
    agreedPrice: req.body.agreedPrice,
    //realCost: req.body.agreedPrice * req.body.quantity,
    difference: difference,
    project: req.body.projectId,
    priceWp: (req.body.agreedPrice * req.body.quantity) / project.power,
  });

  return budgetRow
    .save()
    .then(() => {
      return ProjectModel.findById(req.body.projectId);
    })
    .then((foundProject) => {
      if (!foundProject) {
        res.send("Project could not be found");
      }
      foundProject.budget.push(budgetRow);
      foundProject.save();
    })
    .then(() => res.send(budgetRow))
    .catch((err) => {
      return res.status(401).send(err);
    });
});

//edit row
router.put("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const budgetRow = await BudgetRowsModel.findById(req.body.budgetRowId);
  if (!budgetRow) {
    return res.status(401).send("Budget row could not be found");
  }
  const project = await ProjectModel.findById(budgetRow.project);
  if (!project) {
    return res.status(401).send("Project could not be found");
  }

  let newInvoice;
  let newTotalPrice;
  let newDifference;

  if (req.body.invoice) {
    newInvoice = budgetRow.invoice.concat(req.body.invoice);
  }

  if (req.body.singlePrice || req.body.quantity) {
    if (
      (req.body.singlePrice || budgetRow.singlePrice) &&
      (req.body.quantity || budgetRow.quantity)
    ) {
      newTotalPrice =
        (req.body.singlePrice ? req.body.singlePrice : budgetRow.singlePrice) *
        (req.body.quantity ? req.body.quantity : budgetRow.quantity);
    }
  }

  if (req.body.agreedPrice || req.body.singlePrice || req.body.quantity) {
    if (
      (req.body.agreedPrice || budgetRow.agreedPrice) &&
      (req.body.singlePrice || budgetRow.singlePrice) &&
      (req.body.quantity || budgetRow.quantity)
    ) {
      newDifference =
        ((req.body.agreedPrice ? req.body.agreedPrice : budgetRow.agreedPrice) -
          (req.body.singlePrice
            ? req.body.singlePrice
            : budgetRow.singlePrice)) *
        (req.body.quantity ? req.body.quantity : budgetRow.quantity);
    }
  }
  try {
    await BudgetRowsModel.findOneAndUpdate(
      {
        _id: budgetRow._id,
      },
      {
        $set: {
          position: req.body.position,
          size: req.body.size,
          quantity: req.body.quantity,
          singlePrice: req.body.singlePrice,
          totalPrice: newTotalPrice,
          // offerPath: req.body.offerPath,
          provider: req.body.provider,
          // invoice: newInvoice,
          agreedPrice: req.body.agreedPrice,
          difference: newDifference,
        },
      }
    );
    return res.status(200).send("Updated");
  } catch (error) {
    return res.status(400).send(error);
  }
});

//delete individual row
router.delete("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const budgetRow = await BudgetRowsModel.findById(req.body.budgetRowId);
  if (!budgetRow) {
    return res.status(400).send("Row could not be found");
  }

  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.status(400).send("Project could not be found");
  }

  await ProjectModel.updateOne(
    { _id: project._id },
    { $pull: { budget: { $in: req.body.budgetRowId } } }
  );

  await BudgetRowsModel.deleteOne({
    _id: req.body.budgetRowId,
  });
  return budgetRow;
});

module.exports = router;
