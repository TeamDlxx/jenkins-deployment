var express = require("express");
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get("/", function (req, res, next) {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data, 'Server Ip')
    // setIP(res.data.IPv4)
  res.render("index", {title: "Backend Template | API Services"});
});

module.exports = router;
