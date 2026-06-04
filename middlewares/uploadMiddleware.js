const multer = require("multer");
const path = require("path");
const {v4: uuid} = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "storage/uploads");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${uuid()}${extension}`);
  }
});

const upload = multer({
  storage,
  limits:{
    fileSize: 1024*1024*1024
  }
});

module.exports = upload;
