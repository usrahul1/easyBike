const Bike = require("../models/bikeModel");
const RentalRequest = require("../models/rentalRequest");

const handleRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const { action } = req.body;
		const { io, connectedUsers } = req;

		const rentalReq = await RentalRequest.findById(requestId);
		if (!rentalReq) return res.status(404).json({ error: "Request not found" });

		if (rentalReq.status !== "pending")
			return res.status(400).json({ error: "Request already processed" });

		const bike = await Bike.findById(rentalReq.bikeId);
		if (!bike) return res.status(404).json({ error: "Bike not found" });

		if (action === "accept") {
			const reqStart = new Date(rentalReq.startTime);
			const reqEnd = new Date(rentalReq.endTime);

			if (
				reqStart < bike.startTime ||
				reqEnd > bike.endTime ||
				reqStart >= reqEnd
			) {
				return res.status(400).json({
					error: "Requested time is outside bike's availability or invalid",
				});
			}

			const conflict = await RentalRequest.findOne({
				bikeId: rentalReq.bikeId,
				status: "accepted",
				$or: [
					{
						startTime: { $lt: reqEnd },
						endTime: { $gt: reqStart },
					},
				],
			});

			if (conflict) {
				return res.status(409).json({
					error: "Another booking overlaps with this time",
				});
			}

			await Bike.findByIdAndUpdate(rentalReq.bikeId, { isRented: true });
			rentalReq.status = "accepted";

			const durationHours = Math.ceil((reqEnd - reqStart) / (1000 * 60 * 60));
			const basePrice = bike.pricePerHour;
			const totalPrice = durationHours * bike.pricePerHour;

			rentalReq.basePrice = basePrice;
			rentalReq.totalPrice = totalPrice;

			await rentalReq.save();

			//Emit chat available to both users
			const roomId = rentalReq._id.toString();
			const { customerId, ownerId } = rentalReq;

			const ownerSocket = connectedUsers[ownerId];
			const customerSocket = connectedUsers[customerId];
			const payload = {
				roomId,
				message: "Chat available",
				ownerId,
				customerId,
			};

			if (ownerSocket) io.to(ownerSocket).emit("chat-available", payload);
			if (customerSocket) io.to(customerSocket).emit("chat-available", payload);

			res.status(200).json({
				message: "Request accepted",
				rentalReq,
			});
		} else if (action === "reject") {
			rentalReq.status = "rejected";
			await rentalReq.save();
			res.status(200).json({
				message: "Request rejected",
				rentalReq,
			});
		} else {
			res.status(400).json({ error: "Invalid action" });
		}
	} catch (err) {
		console.error("Error handling request:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = handleRequest;
