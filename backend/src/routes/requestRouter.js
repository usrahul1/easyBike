const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const bikeReq = require("../data-adders/bikeReqAdder");

router.post("/bike_req", upload.none(), bikeReq);

module.exports = router;
