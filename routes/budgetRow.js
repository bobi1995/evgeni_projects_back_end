const express = require("express");
const ProjectModel = require("../mongoModels/project");
const UserModel = require("../mongoModels/user");
const BudgetRowsModel = require("../mongoModels/rowsOfBudget");
const router = express.Router();
const fs = require("fs");
const localAddress = require("../globals/localAddess");

//MULTERS
const uploadOffer = require("./multers/rowsOfBudget/offer");
const uploadInvoice = require("./multers/rowsOfBudget/invoice");

//upload invoice
router.post(
  "/invoice",
  uploadInvoice.single("invoice"),
  async (req, res, next) => {
    console.log("here");
    const file = req.file;
    const rowOfBudget = await BudgetRowsModel.findById(req.body.rowId);
    if (!rowOfBudget) {
      return res.status(201).send("Row not found");
    }
    if (!file) {
      return res.status(201).send("Please upload a file");
    }
    rowOfBudget.invoice.push(file.originalname);
    await rowOfBudget.save();
    return res.status(200).send("Uploaded");
  }
);

//delete invoice
router.delete("/invoice", async (req, res) => {
  const rowOfBudget = await BudgetRowsModel.findById(req.body.rowId);
  if (!rowOfBudget) {
    return res.status(201).send("Row not found");
  }

  const filePath = `${localAddress}/${req.body.projectId}/budgetRows/${req.body.rowId}/invoice/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = rowOfBudget.invoice.indexOf(req.body.fileName);
  if (index !== -1) {
    rowOfBudget.invoice.splice(index, 1);
  }

  await rowOfBudget.save();
  return res.status(200).send("Deleted");
});

//upload offer
router.post("/offer", uploadOffer.single("offer"), async (req, res, next) => {
  console.log("here");
  const file = req.file;
  const rowOfBudget = await BudgetRowsModel.findById(req.body.rowId);
  if (!rowOfBudget) {
    return res.status(201).send("Row not found");
  }
  if (!file) {
    return res.status(201).send("Please upload a file");
  }
  rowOfBudget.offer.push(file.originalname);
  await rowOfBudget.save();
  return res.status(200).send("Uploaded");
});

//delete offer
router.delete("/offer", async (req, res) => {
  const rowOfBudget = await BudgetRowsModel.findById(req.body.rowId);
  if (!rowOfBudget) {
    return res.status(201).send("Row not found");
  }

  const filePath = `${localAddress}/${req.body.projectId}/budgetRows/${req.body.rowId}/offer/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = rowOfBudget.offer.indexOf(req.body.fileName);
  if (index !== -1) {
    rowOfBudget.offer.splice(index, 1);
  }

  await rowOfBudget.save();
  return res.status(200).send("Deleted");
});

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

  project.totalProfit =
    project.totalProfit - budgetRow.agreedPrice * budgetRow.quantity;
  await project.save();
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
    .then(() => res.status(200).send("Updated"))
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

    const allRows = await BudgetRowsModel.find({
      project: project._id,
    });

    if (allRows.length > 0) {
      let totalBudget = 0;
      allRows.map(
        (el) => (totalBudget = totalBudget + el.agreedPrice * el.quantity)
      );

      project.totalProfit = project.contractSum - totalBudget;
      await project.save();
    }

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

  const allRows = await BudgetRowsModel.find({
    project: req.body.projectId,
  });

  if (allRows.length > 0) {
    let totalBudget = 0;
    allRows.map(
      (el) => (totalBudget = totalBudget + el.agreedPrice * el.quantity)
    );

    project.totalProfit = project.contractSum - totalBudget;
    await project.save();
  }
  return res.status(200).send("Deleted");
});

module.exports = router;
