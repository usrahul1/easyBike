// controllers/getCustomerRequests.js
const RentalRequest = require("../models/rentalRequest");

const getCustomerRequests = async (req, res) => {
	try {
		const { customerId } = req.params;

		const requests = await RentalRequest.find({ customerId })
			.sort({ requestedAt: -1 })
			.populate("bikeId");

		res.status(200).json({ requests });
	} catch (err) {
		console.error("Error fetching customer requests:", err);
		res.status(500).json({ error: "Could not fetch requests" });
	}
};

module.exports = getCustomerRequests;
