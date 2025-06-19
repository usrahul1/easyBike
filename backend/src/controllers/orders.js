const RentalRequest = require("../models/rentalRequest");

const getOrdersByCustomer = async (req, res) => {
	try {
		const { customerId } = req.params;
		if (!customerId) {
			return res.status(400).json({ error: "Customer ID is required" });
		}

		const orders = await RentalRequest.find({ customerId }).sort({
			requestedAt: -1,
		});
		console.log("hi", orders);
		res.status(200).json({ orders });
	} catch (err) {
		console.error("Error fetching customer orders:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getOrdersByOwner = async (req, res) => {
	try {
		const { ownerId } = req.params;
		if (!ownerId) {
			return res.status(400).json({ error: "Owner ID is required" });
		}

		const orders = await RentalRequest.find({ ownerId }).sort({
			requestedAt: -1,
		});
		console.log("hi", orders);

		res.status(200).json({ orders });
	} catch (err) {
		console.error("Error fetching owner orders:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = { getOrdersByCustomer, getOrdersByOwner };
