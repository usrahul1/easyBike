const Bike = require("../models/bikeModel");
const RentalRequest = require("../models/rentalRequest");
const BikeRegistration = require("../models/bikeReqModel");
const NodeGeocoder = require("node-geocoder");

const getAcceptedRequestsCount = async (req, res) => {
	try {
		const count = await RentalRequest.countDocuments({ status: "accepted" });
		res.status(200).json({ acceptedRequestsCount: count });
	} catch (error) {
		console.error("Error fetching accepted requests count:", error);
		res.status(500).json({ message: "Server Error", error });
	}
};

const getMonthlyAcceptedRequests = async (req, res) => {
	try {
		const year = parseInt(req.query.year);
		if (!year || isNaN(year)) {
			return res.status(400).json({ message: "Invalid or missing year" });
		}

		const today = new Date();
		const currentMonth =
			today.getFullYear() === year ? today.getMonth() + 1 : 12;

		const monthlyData = await RentalRequest.aggregate([
			{
				$match: {
					status: "accepted",
					requestedAt: {
						$gte: new Date(`${year}-01-01T00:00:00.000Z`),
						$lte: new Date(`${year}-12-31T23:59:59.999Z`),
					},
				},
			},
			{
				$group: {
					_id: { $month: "$requestedAt" },
					count: { $sum: 1 },
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);

		const fullData = Array.from({ length: currentMonth }, (_, i) => {
			const month = i + 1;
			const match = monthlyData.find((m) => m._id === month);
			return {
				month,
				count: match ? match.count : 0,
			};
		});

		res.status(200).json({ year, monthlyAccepted: fullData });
	} catch (error) {
		console.error("Error fetching monthly accepted requests:", error);
		res.status(500).json({ message: "Server Error", error });
	}
};

const getAllBikesCount = async (req, res) => {
	try {
		const count = await Bike.countDocuments();
		res.status(200).json({ totalBikesCount: count });
	} catch (error) {
		console.error("Error fetching bike count:", error);
		res.status(500).json({ message: "Server Error", error });
	}
};

const getRecentRentalRequests = async (req, res) => {
	try {
		const recentRequests = await RentalRequest.find()
			.sort({ requestedAt: -1 }) // latest first
			.limit(10)
			.populate("bikeId"); // include bike info

		res.status(200).json({
			count: recentRequests.length,
			requests: recentRequests,
		});
	} catch (error) {
		console.error("Error fetching recent rental requests:", error);
		res.status(500).json({ message: "Server Error", error });
	}
};

const getAllBikeRequests = async (req, res) => {
	try {
		const bikes = await BikeRegistration.find().sort({ createdAt: -1 });
		res.status(200).json(bikes);
	} catch (err) {
		console.error("Error fetching bike requests:", err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getAllBikes = async (req, res) => {
	try {
		const bikes = await Bike.find().sort({ createdAt: -1 });
		res.status(200).json({ count: bikes.length, bikes });
	} catch (error) {
		console.error("Error fetching all bikes:", error);
		res.status(500).json({ message: "Server Error", error });
	}
};

const deleteBike = async (req, res) => {
	try {
		const { id } = req.params;

		const bike = await Bike.findByIdAndDelete(id);
		if (!bike) {
			return res.status(404).json({ message: "Bike not found" });
		}

		res.status(200).json({ message: "Bike deleted successfully", bike });
	} catch (error) {
		console.error("Error deleting bike:", error);
		res.status(500).json({ message: "Server Error", error });
	}
};

const getRentalStats = async (req, res) => {
	try {
		const now = new Date();
		const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of previous month

		// Total rental requests
		const totalCount = await RentalRequest.countDocuments();

		// Requests from previous month
		const lastMonthCount = await RentalRequest.countDocuments({
			requestedAt: {
				$gte: startOfLastMonth,
				$lte: endOfLastMonth,
			},
		});

		// Requests from this month
		const thisMonthCount = await RentalRequest.countDocuments({
			requestedAt: {
				$gte: startOfThisMonth,
				$lte: now,
			},
		});

		// Calculate growth percentage
		const growth =
			lastMonthCount === 0
				? 100
				: ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;

		res.status(200).json({
			totalRequests: totalCount,
			thisMonth: thisMonthCount,
			lastMonth: lastMonthCount,
			growthPercent: parseFloat(growth.toFixed(2)),
		});
	} catch (error) {
		console.error("Error fetching rental stats:", error);
		res.status(500).json({
			error: "Failed to fetch rental stats",
			details: error.message,
		});
	}
};

const getMonthlySalesData = async (req, res) => {
	try {
		const currentYear = new Date().getFullYear();

		const monthlyData = await RentalRequest.aggregate([
			{
				$match: {
					requestedAt: {
						$gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
						$lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
					},
				},
			},
			{
				$group: {
					_id: { $month: "$requestedAt" },
					totalSales: { $sum: 1 },
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);

		const salesArray = new Array(12).fill(0);
		monthlyData.forEach((item) => {
			salesArray[item._id - 1] = item.totalSales;
		});

		res.status(200).json({ sales: salesArray });
	} catch (err) {
		console.error("Failed to get monthly sales data:", err);
		res.status(500).json({ error: "Failed to get monthly sales data" });
	}
};

const geocoder = NodeGeocoder({
	provider: "openstreetmap",
});

const getCustomerDemographics = async (req, res) => {
	try {
		const rentalRequests = await RentalRequest.find().select("bikeId");
		const bikeIds = rentalRequests.map((r) => r.bikeId);

		const bikes = await Bike.find({ _id: { $in: bikeIds } }).select(
			"_id location.coordinates"
		);

		const countryCounts = {};

		for (const bike of bikes) {
			const [longitude, latitude] = bike.location.coordinates;

			// Skip if coordinates are 0,0
			if (latitude === 0 && longitude === 0) continue;

			try {
				const [result] = await geocoder.reverse({
					lat: latitude,
					lon: longitude,
				});
				const country = result?.country || "Unknown";

				if (countryCounts[country]) {
					countryCounts[country]++;
				} else {
					countryCounts[country] = 1;
				}
			} catch (geoErr) {
				console.warn("Geocoding failed for bike:", bike._id);
			}
		}

		const resultArray = Object.entries(countryCounts).map(
			([country, count]) => ({
				country,
				count,
			})
		);

		res.status(200).json({ demographics: resultArray });
	} catch (error) {
		console.error("Failed to get customer demographics:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getLastFiveRentalRequests = async (req, res) => {
	try {
		const recentRequests = await RentalRequest.find()
			.sort({ requestedAt: -1 }) // Sort by newest first
			.limit(5) // Only 5 entries
			.populate("bikeId"); // Optional: populate bike info if needed

		res.status(200).json({
			count: recentRequests.length,
			data: recentRequests,
		});
	} catch (error) {
		console.error("Error fetching last 5 rental requests:", error);
		res.status(500).json({
			message: "Failed to fetch rental requests",
			error: error.message,
		});
	}
};

const getAllRentalRequests = async (req, res) => {
	try {
		const allRequests = await RentalRequest.find()
			.sort({ requestedAt: -1 }) // Sort by newest first
			.populate("bikeId"); // Populate bike info if needed

		res.status(200).json({
			count: allRequests.length,
			data: allRequests,
		});
	} catch (error) {
		console.error("Error fetching all rental requests:", error);
		res.status(500).json({
			message: "Failed to fetch all rental requests",
			error: error.message,
		});
	}
};

module.exports = {
	getAcceptedRequestsCount,
	getMonthlyAcceptedRequests,
	getAllBikesCount,
	getRecentRentalRequests,
	getAllBikeRequests,
	getAllBikes,
	deleteBike,
	getRentalStats,
	getMonthlySalesData,
	getCustomerDemographics,
	getLastFiveRentalRequests,
	getAllRentalRequests,
};
