const Bike = require("../models/bikeModel");

const goOffline = async (req, res) => {
	try {
		const { id } = req.params;

		const updatedBike = await Bike.findByIdAndUpdate(
			id,
			{
				isOnline: false,
				startTime: undefined,
				endTime: undefined,
			},
			{ new: true }
		);

		if (!updatedBike) {
			return res.status(404).json({ error: "Bike not found" });
		}

		res.status(200).json({
			message: "Bike is now offline and availability time cleared",
			bike: updatedBike,
		});
	} catch (error) {
		console.error("Error setting bike offline:", error);
		res.status(500).json({ error: "Could not set bike offline" });
	}
};

module.exports = goOffline;
