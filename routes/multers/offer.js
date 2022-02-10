const multer = require("multer");
const localAddress = require("../../globals/localAddess");
const fs = require("fs");

//MULTER DECLARATIONS OFFER
const storageOffer = multer.diskStorage({
  destination: (req, file, callback) => {
    const { projectId } = req.body;
    if (!projectId) {
      return "Not found";
    }
    const path = `${localAddress}/${projectId}/offer`;
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
