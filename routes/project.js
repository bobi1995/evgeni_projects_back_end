const express = require("express");
const ProjectModel = require("../mongoModels/project");
const UserModel = require("../mongoModels/user");
const BudgetRowsModel = require("../mongoModels/rowsOfBudget");
const router = express.Router();
const fs = require("fs");
const localAddress = require("../globals/localAddess");

//MULTER DECLARATIONS OFFER
const uploadOffer = require("./multers/offer");
const uploadSchedule = require("./multers/schedule");
const uploadSimulation = require("./multers/simulation");
const uploadContract = require("./multers/contract");
const uploadSubcontractor = require("./multers/subcontractor");
const uploadPictures = require("./multers/pictures");

//upload offer
router.post("/offer", uploadOffer.single("offer"), async (req, res, next) => {
  const file = req.file;
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  if (!file) {
    return res.send("Please upload a file");
  }
  project.offer.push(file.originalname);
  await project.save();
  return res.send(file.originalname);
});

//delete offer
router.delete("/offer", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/offer/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.offer.indexOf(req.body.fileName);
  if (index !== -1) {
    project.offer.splice(index, 1);
  }

  await project.save();
  res.status(200);
  return res.send("Deleted");
});

//upload schedule
router.post(
  "/schedule",
  uploadSchedule.single("schedule"),
  async (req, res, next) => {
    const file = req.file;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.send("Project not found");
    }
    if (!file) {
      return res.send("Please upload a file");
    }
    project.schedule.push(file.originalname);
    await project.save();
    return res.send(file.originalname);
  }
);

//delete schedule
router.delete("/schedule", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/schedule/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.schedule.indexOf(req.body.fileName);
  if (index !== -1) {
    project.schedule.splice(index, 1);
  }

  await project.save();
  res.status(200);
  return res.send("Deleted");
});

//upload simulation
router.post(
  "/simulation",
  uploadSimulation.single("simulation"),
  async (req, res, next) => {
    const file = req.file;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.send("Project not found");
    }
    if (!file) {
      return res.send("Please upload a file");
    }
    project.simulation.push(file.originalname);
    await project.save();
    return res.send(file.originalname);
  }
);

//delete simulation
router.delete("/simulation", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/simulation/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.simulation.indexOf(req.body.fileName);
  if (index !== -1) {
    project.simulation.splice(index, 1);
  }

  await project.save();
  res.status(200);
  return res.send("Deleted");
});

//upload contract
router.post(
  "/contract",
  uploadContract.single("contract"),
  async (req, res, next) => {
    const file = req.file;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.send("Project not found");
    }
    if (!file) {
      return res.send("Please upload a file");
    }
    project.contractAssigner.push(file.originalname);
    project.status = 1;
    await project.save();
    return res.send(file.originalname);
  }
);

//delete contract
router.delete("/contract", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/contract/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.contractAssigner.indexOf(req.body.fileName);
  if (index !== -1) {
    project.contractAssigner.splice(index, 1);
  }
  project.contractAssigner.length < 1 ? (project.status = 0) : null;
  await project.save();
  res.status(200);
  return res.send("Deleted");
});

//upload subcontractor
router.post(
  "/subcontractor",
  uploadSubcontractor.single("subcontractor"),
  async (req, res, next) => {
    const file = req.file;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.send("Project not found");
    }
    if (!file) {
      return res.send("Please upload a file");
    }
    project.contractSubcontractor.push(file.originalname);
    await project.save();
    return res.send(file.originalname);
  }
);

//delete subcontractor
router.delete("/subcontractor", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/subcontractor/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.contractSubcontractor.indexOf(req.body.fileName);
  if (index !== -1) {
    project.contractSubcontractor.splice(index, 1);
  }

  await project.save();
  res.status(200);
  return res.send("Deleted");
});

//upload pictures
router.post(
  "/pictures",
  uploadPictures.single("pictures"),
  async (req, res, next) => {
    const file = req.file;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.send("Project not found");
    }
    if (!file) {
      return res.send("Please upload a file");
    }
    project.pictures.push(file.originalname);
    await project.save();
    return res.send(file.originalname);
  }
);

//delete pictures
router.delete("/pictures", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/pictures/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.pictures.indexOf(req.body.fileName);
  if (index !== -1) {
    project.pictures.splice(index, 1);
  }

  await project.save();
  res.status(200);
  return res.send("Deleted");
});

//get individual project
router.get("/:projectId", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const project = await ProjectModel.findById(req.params.projectId)
    .populate("budget")
    .populate("owner");
  if (!project) {
    return res.send("Project does not exist");
  }
  res.status(200);
  return res.send(project);
});

//add individual project
router.post("/", async (req, res) => {
  const user = await UserModel.findById(req.body.ownerId);
  if (!user) {
    return res.send("Owner could not be found");
  }

  const project = new ProjectModel({
    name: req.body.name,
    power: req.body.power,
    location: req.body.location,
    status: 0,
    type: req.body.type,
    startDate: req.body.startDate ? req.body.startDate : new Date(),
    targetDate: req.body.targetDate ? req.body.targetDate : new Date(),
    owner: req.body.ownerId,
    offer: [],
    schedule: [],
    simulation: [],
    contractAssigner: [],
    contractSubcontractor: [],
  });
  let createdProject;
  return project
    .save()
    .then((result) => {
      createdProject = result;
      fs.mkdirSync(
        `D:\\evgeni\\project-system\\projects\\${createdProject._id}`
      );

      return UserModel.findById(req.body.ownerId);
    })
    .then((foundUser) => {
      if (!foundUser) {
        return res.send("Owner could not be found");
      }
      foundUser.projects.push(project);
      return foundUser.save();
    })
    .then(() => {
      return res.send(createdProject._id);
    })
    .catch((err) => {
      return res.send(err);
    });
});

//edit project
router.put("/", async (req, res) => {
  console.log(req.body);
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project could not be found");
  }
  if (project.status === 2) {
    return res.send("Project is closed and cannot be edited anymore");
  }

  let newOfferPath;
  let newSchedulePath;
  let newSimulationPath;
  let newAssignerPath;
  let newSubcontractorPath;
  let newPicturesPath;

  if (req.body.offerPath) {
    newOfferPath = project.offer.concat(req.body.offerPath);
  }

  if (req.body.schedulePath) {
    newSchedulePath = project.schedule.concat(req.body.schedulePath);
  }

  if (req.body.simulationPath) {
    newSimulationPath = project.simulation.concat(req.body.simulationPath);
  }

  if (req.body.assignerPath) {
    newAssignerPath = project.contractAssigner.concat(req.body.assignerPath);
  }

  if (req.body.subcontractorPath) {
    newSubcontractorPath = project.contractSubcontractor.concat(
      req.body.subcontractorPath
    );
  }

  if (req.body.picturesPath) {
    newPicturesPath = project.pictures.concat(req.body.picturesPath);
  }

  const updatedProject = await ProjectModel.findOneAndUpdate(
    {
      _id: project._id,
    },
    {
      $set: {
        power: req.body.power,
        offer: newOfferPath,
        schedule: newSchedulePath,
        simulation: newSimulationPath,
        contractAssigner: newAssignerPath,
        contractSubcontractor: newSubcontractorPath,
        pictures: newPicturesPath,
        targetDate: req.body.targetDate,
        totalProfit: req.body.totalProfit,
        contractSum: req.body.contractSum,
        type: req.body.type,
        name: req.body.name,
      },
    }
  )
    .then((respond) => res.send(updatedProject))
    .catch((err) => res.send(err));
});

//delete individual project
router.delete("/:projectId", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const project = await ProjectModel.findById(req.params.projectId);
  if (!project) {
    return res.send("Project could not be found");
  }
  const owner = await UserModel.findById(project.owner);
  if (!owner) {
    return res.send("Owner could not be found");
  }

  await UserModel.updateOne(
    { _id: owner._id },
    { $pull: { projects: { $in: req.params.projectId } } }
  );

  if (project.budget.length > 0) {
    project.budget.map(async (el) => {
      return await BudgetRowsModel.deleteOne({
        _id: el,
      });
    });
  }

  await ProjectModel.deleteOne({
    _id: req.params.projectId,
  });

  return res.send(project);
});

module.exports = router;
