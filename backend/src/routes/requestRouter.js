const express = require("express");
const router = express.Router();
const bikeReq = require("../data-adders/bikeReqAdder");

router.post("/bike_req", bikeReq);

module.exports = router;
