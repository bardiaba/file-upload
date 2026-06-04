var express = require('express');
var router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const fileService = require("../services/fileService");

/* GET home page. */
router.get('/',authMiddleware, async function(req, res, next) {
  const files = await fileService.getAllFiles(req.user.username);
  res.render('pages/dashboard', {username: req.user.username, uploads: files});
});



module.exports = router;
