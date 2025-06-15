// controllers/orderBike.js
const Bike = require("../models/bikeModel");
const RentalRequest = require("../models/rentalRequest");

const orderBike = async (req, res) => {
	try {
		const { bikeId, customerId } = req.body;

		if (!bikeId || !customerId)
			return res.status(400).json({ error: "bikeId and customerId required" });

		const bike = await Bike.findById(bikeId);
		if (!bike) return res.status(404).json({ error: "Bike not found" });

		// 1. Create Rental Request
		const rentalReq = await RentalRequest.create({
			bikeId,
			customerId,
			ownerId: bike.ownerId,
		});

		// 2. Notify Owner (if online)
		const io = req.app.get("io");
		const connectedUsers = req.app.get("connectedUsers");
		const ownerSocketId = connectedUsers[bike.ownerId];

		if (ownerSocketId) {
			io.to(ownerSocketId).emit("bike-requested", {
				requestId: rentalReq._id,
				bikeId,
				customerId,
				brand: bike.brand,
				model: bike.model,
			});
			console.log(`📨 Notified owner ${bike.ownerId}`);
		} else {
			console.log(`⚠️ Owner ${bike.ownerId} not connected`);
		}

		res
			.status(200)
			.json({ message: "Bike request created", requestId: rentalReq._id });
	} catch (err) {
		console.error("❌ Error ordering bike:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = orderBike;
