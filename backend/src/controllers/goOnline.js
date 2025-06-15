// controllers/goOnline.js
const Bike = require("../models/bikeModel");

const goOnline = async (req, res) => {
	try {
		const { id } = req.params;
		const { latitude, longitude } = req.body;

		if (!latitude || !longitude) {
			return res.status(400).json({ error: "Location required" });
		}

		const updatedBike = await Bike.findByIdAndUpdate(
			id,
			{
				isOnline: true,
				location: {
					type: "Point",
					coordinates: [longitude, latitude],
				},
			},
			{ new: true }
		);

		if (!updatedBike) {
			return res.status(404).json({ error: "Bike not found" });
		}

		res.status(200).json({
			message: "Bike is now online and available",
			bike: updatedBike,
		});
	} catch (error) {
		console.error("Error setting bike online:", error);
		res.status(500).json({ error: "Could not set bike online" });
	}
};

module.exports = goOnline;
