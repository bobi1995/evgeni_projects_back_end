const multer = require("multer");
const localAddress = require("../../globals/localAddess");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { projectId } = req.body;
    if (!projectId) {
      return "Not found";
    }
    const path = `${localAddress}/${projectId}/schedule`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    callback(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const uploadSchedule = multer({ storage: storage });

module.exports = uploadSchedule;
