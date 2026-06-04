var express = require('express');
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

var router = express.Router();
const fileController = require('../controllers/fileController')


router.get('/upload', authMiddleware ,fileController.showUpload);

router.post('/upload', authMiddleware,uploadMiddleware.single("file"), fileController.create)
router.post('/download/:uuid', fileController.download);
router.post('/delete/:uuid', authMiddleware, fileController.delete);
router.get('/:uuid', fileController.showDownload);
module.exports = router;
