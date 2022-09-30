var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {title: "Node Js Backend Template | API Services"});
});

module.exports = router;
