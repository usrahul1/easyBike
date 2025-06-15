const Bike = require("../models/bikeModel");

const getNearbyBikes = async (req, res) => {
	try {
		const { latitude, longitude, page = 1, limit = 10 } = req.body;

		if (!latitude || !longitude) {
			return res.status(400).json({ error: "Location required" });
		}

		const skip = (page - 1) * limit;

		const bikes = await Bike.aggregate([
			{
				$geoNear: {
					near: {
						type: "Point",
						coordinates: [longitude, latitude],
					},
					distanceField: "distance",
					spherical: true,
					maxDistance: 50000,
					query: {
						isOnline: true,
						isRented: false, // ✅ only bikes not rented
					},
				},
			},
			{ $skip: skip },
			{ $limit: parseInt(limit) },
			{
				$addFields: {
					distanceInKm: { $round: [{ $divide: ["$distance", 1000] }, 2] },
				},
			},
			{
				$project: {
					distance: 0,
				},
			},
		]);

		res.status(200).json({
			bikes,
			page: parseInt(page),
			limit: parseInt(limit),
			hasMore: bikes.length === parseInt(limit),
		});
	} catch (error) {
		console.error("Error fetching nearby bikes:", error);
		res.status(500).json({ error: "Could not fetch nearby bikes" });
	}
};

module.exports = getNearbyBikes;
