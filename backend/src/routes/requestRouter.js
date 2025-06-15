const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { bikeReq, acceptBike } = require("../data-adders/bikeReqAdder");
const goOnline = require("../controllers/goOnline");
const goOffline = require("../controllers/goOffline");
const getNearbyBikes = require("../controllers/nearByBikes");
const orderBike = require("../controllers/orderBike");
const handleRequest = require("../controllers/handleRentalRequest");
const getOwnerRequests = require("../controllers/getOwnerRequests");
const getCustomerRequests = require("../controllers/getCustomerRequests");

router.post("/bike_req", upload.none(), bikeReq);
router.post("/admin/accept-bike/:id", acceptBike);
router.post("/bike/online/:id", goOnline);
router.post("/bike/offline/:id", goOffline);
router.post("/bikes/nearby", getNearbyBikes);
router.post("/bike/request/:bikeId", orderBike);
router.post("/order-bike", orderBike);
router.post("/handle-request/:requestId", handleRequest);
router.get("/owner/:ownerId", getOwnerRequests);
router.get("/customer/:customerId", getCustomerRequests);

module.exports = router;
