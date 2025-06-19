const Bike = require("../models/bikeModel");

const getNearbyBikes = async (req, res) => {
	try {
		const { latitude, longitude, page = 1, limit = 10, customerId } = req.body;

		console.log("Received params:", {
			latitude,
			longitude,
			page,
			limit,
			customerId,
		});

		if (!latitude || !longitude) {
			return res.status(400).json({ error: "Location required" });
		}

		if (!customerId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		const skip = (page - 1) * limit;

		const queryFilter = {
			isOnline: true,
			isRented: false,
			ownerId: { $ne: customerId },
		};

		console.log("Geo query filter:", queryFilter);

		const bikes = await Bike.aggregate([
			{
				$geoNear: {
					near: {
						type: "Point",
						coordinates: [longitude, latitude],
					},
					distanceField: "distance",
					spherical: true,
					maxDistance: 200000,
					query: queryFilter,
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

		console.log("Bikes found:", bikes.length);

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
