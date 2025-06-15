const Bike = require("../models/bikeModel");
const RentalRequest = require("../models/rentalRequest");

const handleRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const { action } = req.body; // "accept" or "reject"

		const rentalReq = await RentalRequest.findById(requestId);
		if (!rentalReq) return res.status(404).json({ error: "Request not found" });

		if (rentalReq.status !== "pending")
			return res.status(400).json({ error: "Request already processed" });

		if (action === "accept") {
			await Bike.findByIdAndUpdate(rentalReq.bikeId, { isRented: true });
			rentalReq.status = "accepted";
		} else if (action === "reject") {
			rentalReq.status = "rejected";
		} else {
			return res.status(400).json({ error: "Invalid action" });
		}

		await rentalReq.save();

		res.status(200).json({ message: `Request ${action}ed`, rentalReq });
	} catch (err) {
		console.error("Error handling request:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = handleRequest;
