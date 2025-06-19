const Bike = require("../models/bikeModel");

const getBikesByOwner = async (req, res) => {
	try {
		const { ownerId } = req.body;

		if (!ownerId) {
			return res.status(400).json({ message: "ownerId is required" });
		}

		const bikes = await Bike.find({ ownerId });

		res.status(200).json(bikes);
	} catch (error) {
		console.error("Error fetching bikes by ownerId:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = { getBikesByOwner };
