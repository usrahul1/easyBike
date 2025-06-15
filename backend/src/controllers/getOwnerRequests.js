const RentalRequest = require("../models/rentalRequest");

const getOwnerRequests = async (req, res) => {
	try {
		const { ownerId } = req.params;

		const requests = await RentalRequest.find({ ownerId })
			.sort({ requestedAt: -1 })
			.populate("bikeId");

		res.status(200).json({ requests });
	} catch (err) {
		console.error("Error fetching owner requests:", err);
		res.status(500).json({ error: "Could not fetch requests" });
	}
};

module.exports = getOwnerRequests;
