var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  const GetIP = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log("Server IP: " + res.data.IPv4);
    // setIP(res.data.IPv4)
  };
  GetIP();
  res.render("index", {title: "Backend Template | API Services"});
});

module.exports = router;
