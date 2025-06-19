const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
	bikeReq,
	acceptBike,
	rejectBike,
} = require("../data-adders/bikeReqAdder");
const goOnline = require("../controllers/goOnline");
const goOffline = require("../controllers/goOffline");
const getNearbyBikes = require("../controllers/nearByBikes");
const orderBike = require("../controllers/orderBike");
const handleRequest = require("../controllers/handleRentalRequest");
const {
	getUserByUID,
	getAllUsers,
	deleteUserByUID,
	getTotalUsers,
} = require("../controllers/profDetails");
const {
	// getAcceptedRequestsCount,
	// getMonthlyAcceptedRequests,
	// getAllBikesCount,
	// getRecentRentalRequests,
	getAllBikeRequests,
	getAllBikes,
	deleteBike,
	getRentalStats,
	getMonthlySalesData,
	getCustomerDemographics,
	getLastFiveRentalRequests,
	getAllRentalRequests,
} = require("../controllers/adminController");
const { getBikesByOwner } = require("../controllers/customerController");
const {
	getOrdersByCustomer,
	getOrdersByOwner,
} = require("../controllers/orders");
const { getBikeBrandModelById } = require("../controllers/bike");

// customer routes
router.post("/bike_req", upload.none(), bikeReq);
router.post("/get-user-bikes", getBikesByOwner);
router.post("/bikes/:id/go-online", goOnline);
router.post("/bikes/:id/go-offline", goOffline);
router.post("/bikes/nearby", getNearbyBikes);
router.post("/bike/request", orderBike);
router.get("/customer/:customerId", getOrdersByCustomer);
router.get("/owner/:ownerId", getOrdersByOwner);
router.get("/bike/:bikeId/brand-model", getBikeBrandModelById);
router.post("/rental-request/:requestId/action", handleRequest);

router.get("/all_bike_req", getAllBikeRequests);

// Admin route
router.post("/admin/accept-bike/:id", acceptBike);
router.post("/admin/reject-bike/:id", rejectBike);
router.post("/know_user", getUserByUID);
router.get("/bikes", getAllBikes);
router.delete("/bikes/:id", deleteBike);
router.get("/all-users", getAllUsers);
router.delete("/delete-user", deleteUserByUID);
router.get("/total-users", getTotalUsers);
router.get("/rental-stats", getRentalStats);
router.get("/monthly-sales", getMonthlySalesData);
router.get("/demographics", getCustomerDemographics);
router.get("/rental-requests/all", getAllRentalRequests);
router.get("/rental-requests/recent", getLastFiveRentalRequests);

module.exports = router;
