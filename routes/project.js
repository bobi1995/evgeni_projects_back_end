const express = require("express");
const ProjectModel = require("../mongoModels/project");
const UserModel = require("../mongoModels/user");
const BudgetRowsModel = require("../mongoModels/rowsOfBudget");
const ResultModel = require("../mongoModels/result");
const router = express.Router();
const fs = require("fs");
const localAddress = require("../globals/localAddess");
const moment = require("moment");

//MULTER DECLARATIONS OFFER
const uploadOffer = require("./multers/project/offer");
const uploadSchedule = require("./multers/project/schedule");
const uploadSimulation = require("./multers/project/simulation");
const uploadContract = require("./multers/project/contract");
const uploadSubcontractor = require("./multers/project/subcontractor");
const uploadPictures = require("./multers/project/pictures");
const uploadStandpoint = require("./multers/project/standpoint");
const uploadPermission = require("./multers/project/permission");
const uploadProjectDocs = require("./multers/project/projectDocs");

//upload standpoint
router.post(
  "/standpoint",
  uploadStandpoint.single("standpoint"),
  async (req, res, next) => {
    const file = req.file;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.send("Project not found");
    }
    if (!file) {
      return res.send("Please upload a file");
    }
    project.standpoint.push(file.originalname);
    await project.save();
    return res.send(file.originalname);
  }
);

//delete standpoint
router.delete("/standpoint", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/standpoint/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.standpoint.indexOf(req.body.fileName);
  if (index !== -1) {
    project.standpoint.splice(index, 1);
  }

  await project.save();
  res.status(200);
  return res.send("Deleted");
});

//upload permission
router.post(
  "/permission",
  uploadPermission.single("permission"),
  async (req, res, next) => {
    const file = req.file;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.status(200).send("Project not found");
    }
    if (!file) {
      return res.status(200).send("Please upload a file");
    }
    project.permission.push(file.originalname);
    await project.save();
    return res.send(file.originalname);
  }
);

//delete permission
router.delete("/permission", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/permission/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.permission.indexOf(req.body.fileName);
  if (index !== -1) {
    project.permission.splice(index, 1);
  }

  await project.save();
  res.status(200);
  return res.send("Deleted");
});

//upload projectDocs
router.post(
  "/projectDocs",
  uploadProjectDocs.single("projectDocs"),
  async (req, res, next) => {
    const file = req.file;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.send("Project not found");
    }
    if (!file) {
      return res.send("Please upload a file");
    }
    project.projectDocs.push(file.originalname);
    await project.save();
    return res.send(file.originalname);
  }
);

//delete projectDocs
router.delete("/projectDocs", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.send("Project not found");
  }
  const filePath = `${localAddress}/${req.body.projectId}/projectDocs/${req.body.fileName}`;
  fs.unlinkSync(filePath);
  const index = project.projectDocs.indexOf(req.body.fileName);
  if (index !== -1) {
    project.projectDocs.splice(index, 1);
  }

  await project.save();
  res.status(200);
  return res.send("Deleted");
});

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
  uploadPictures.array("pictures", 12),
  async (req, res, next) => {
    const file = req.files;
    const project = await ProjectModel.findById(req.body.projectId);
    if (!project) {
      return res.status(201).send("Project not found");
    }
    if (!file || file.length < 1) {
      return res.status(201).send("Please upload a file");
    }
    file.map((el) => project.pictures.push(el.originalname));
    await project.save();
    return res.status(200).send("Uploaded");
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

//get all projects
router.get("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const projects = await ProjectModel.find().populate("owner");
  if (!projects) {
    return res.status(201).send("Project does not exist");
  }
  return res.status(200).send(projects);
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
      console.log(createdProject);
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
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.status(201).send("Project could not be found");
  }
  if (project.status === 2) {
    return res
      .status(201)
      .send("Project is closed and cannot be edited anymore");
  }

  const updatedProject = await ProjectModel.findOneAndUpdate(
    {
      _id: project._id,
    },
    {
      $set: {
        power: req.body.power,
        targetDate: req.body.targetDate,
        totalProfit: req.body.totalProfit,
        contractSum: req.body.contractSum,
        type: req.body.type,
        name: req.body.name,
        location: req.body.location,
      },
    }
  )
    .then((respond) => res.status(200).send("Updated"))
    .catch((err) => res.status(201).send(err));
});

//delete individual project
router.delete("/", async (req, res) => {
  if (!req.isAuth) {
    return res.status(401).send("Нямаш права за тази сесия");
  }
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.status(201).send("Project could not be found");
  }
  const owner = await UserModel.findById(project.owner);
  if (!owner) {
    return res.status(201).send("Owner could not be found");
  }
  const result = await ResultModel.find({ project: project._id });

  if (result[0]) {
    await ResultModel.deleteOne({
      _id: result[0]._id,
    });

    await UserModel.updateOne(
      { _id: owner._id },
      { $pull: { results: { $in: result[0]._id } } }
    );
  }

  await UserModel.updateOne(
    { _id: owner._id },
    { $pull: { projects: { $in: req.body.projectId } } }
  );

  if (project.budget.length > 0) {
    project.budget.map(async (el) => {
      return await BudgetRowsModel.deleteOne({
        _id: el,
      });
    });
  }

  await ProjectModel.deleteOne({
    _id: req.body.projectId,
  });

  const filePath = `${localAddress}/${req.body.projectId}/`;

  fs.rmSync(filePath, { recursive: true, force: true });

  return res.status(200).send("deleted");
});

//close project
router.post("/close", async (req, res) => {
  const project = await ProjectModel.findById(req.body.projectId);
  if (!project) {
    return res.status(201).send("Project could not be found");
  }
  if (project.status === 2) {
    return res.status(201).send("Project already closed");
  }
  const user = await UserModel.findById(project.owner);
  if (!user) {
    return res.status(201).send("User not found");
  }
  try {
    const updatedProject = await ProjectModel.findOneAndUpdate(
      {
        _id: project._id,
      },
      {
        $set: {
          status: 2,
          endDate: new Date(),
        },
      }
    );

    const days = moment
      .duration(Math.abs(new Date() - new Date(project.startDate)))
      .asDays();

    const month = Math.round(days / 30);

    const now = new Date();
    const nextMonthFirstDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );
    const startMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    nextMonthFirstDay.setMonth(nextMonthFirstDay.getMonth() + month);

    const result = new ResultModel({
      totalProfit: project.totalProfit,
      period: days,
      project: project._id,
      endDate: nextMonthFirstDay,
      startDate: startMonth,
      name: project.name,
    });
    await result.save();
    user.results.push(result);

    await user.save();
    return res.status(200).send("Closed");
  } catch (error) {
    return res.status(201).send("Unsuccessfull closing");
  }
});

module.exports = router;
