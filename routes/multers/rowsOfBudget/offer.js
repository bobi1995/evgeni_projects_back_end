const multer = require("multer");
const localAddress = require("../../../globals/localAddess");
const fs = require("fs");

//MULTER DECLARATIONS OFFER
const storageOffer = multer.diskStorage({
  destination: (req, file, callback) => {
    const { rowId, projectId } = req.body;
    if (!rowId) {
      return "Not found";
    }
    if (!projectId) {
      return "Not found";
    }
    const budgetPath = `${localAddress}\\${projectId}\\budgetRows`;
    if (!fs.existsSync(budgetPath)) {
      fs.mkdirSync(budgetPath);
    }

    const individualRowPath = `${localAddress}\\${projectId}\\budgetRows\\${rowId}`;
    if (!fs.existsSync(individualRowPath)) {
      fs.mkdirSync(individualRowPath);
    }

    const path = `${localAddress}\\${projectId}\\budgetRows\\${rowId}\\offer`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    callback(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const uploadOffer = multer({ storage: storageOffer });

module.exports = uploadOffer;
