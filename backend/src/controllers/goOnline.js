const Bike = require("../models/bikeModel");

const goOnline = async (req, res) => {
	try {
		const { id } = req.params;
		const { latitude, longitude, startTime, endTime } = req.body;

		if (!latitude || !longitude) {
			return res.status(400).json({ error: "Location is required" });
		}

		if (!startTime || !endTime) {
			return res.status(400).json({ error: "Start and end time are required" });
		}

		const start = new Date(startTime);
		const end = new Date(endTime);
		const now = new Date();
		const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

		if (end < oneHourLater) {
			return res.status(400).json({
				error: "End time must be at least 1 hour from now",
			});
		}

		if (end <= start) {
			return res.status(400).json({
				error: "End time must be after start time",
			});
		}

		const updatedBike = await Bike.findByIdAndUpdate(
			id,
			{
				isOnline: true,
				location: {
					type: "Point",
					coordinates: [longitude, latitude],
				},
				startTime: start,
				endTime: end,
			},
			{ new: true }
		);

		if (!updatedBike) {
			return res.status(404).json({ error: "Bike not found" });
		}

		res.status(200).json({
			message: "Bike is now online with available timing",
			bike: updatedBike,
		});
	} catch (error) {
		console.error("Error setting bike online:", error);
		res.status(500).json({ error: "Could not set bike online" });
	}
};

module.exports = goOnline;
