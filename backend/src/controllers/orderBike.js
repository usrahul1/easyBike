// controllers/orderBike.js
const Bike = require("../models/bikeModel");
const RentalRequest = require("../models/rentalRequest");

const orderBike = async (req, res) => {
	try {
		const { bikeId, customerId, startTime, endTime } = req.body;

		if (!bikeId || !customerId || !startTime || !endTime) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const bike = await Bike.findById(bikeId);
		if (!bike) return res.status(404).json({ error: "Bike not found" });

		const parsedStart = new Date(startTime);
		const parsedEnd = new Date(endTime);

		if (parsedStart >= parsedEnd) {
			return res
				.status(400)
				.json({ error: "End time must be after start time" });
		}

		if (bike.startTime && parsedStart < bike.startTime) {
			return res
				.status(400)
				.json({ error: "Start time is before bike's available time" });
		}
		if (bike.endTime && parsedEnd > bike.endTime) {
			return res
				.status(400)
				.json({ error: "End time exceeds bike's available time" });
		}

		// 🛑 Check for overlapping pending request by the same customer
		const existingRequest = await RentalRequest.findOne({
			bikeId,
			customerId,
			status: "pending",
			$or: [
				{
					startTime: { $lt: parsedEnd },
					endTime: { $gt: parsedStart },
				},
			],
		});

		if (existingRequest) {
			return res.status(409).json({
				error:
					"You already have a pending request for this bike with overlapping time.",
			});
		}

		// ✅ Pricing
		const durationMs = parsedEnd - parsedStart;
		const durationHrs = durationMs / (1000 * 60 * 60);
		const totalPrice = Math.ceil(durationHrs * bike.pricePerHour);
		const basePrice = bike.pricePerHour;

		const rentalReq = await RentalRequest.create({
			bikeId,
			customerId,
			ownerId: bike.ownerId,
			startTime: parsedStart,
			endTime: parsedEnd,
			basePrice,
			totalPrice,
		});

		// 🔔 Notify owner if online
		const io = req.io;
		const connectedUsers = req.connectedUsers;
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

		res.status(200).json({
			message: "Bike request created",
			requestId: rentalReq._id,
			basePrice,
			totalPrice,
		});
	} catch (err) {
		console.error("❌ Error ordering bike:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = orderBike;
