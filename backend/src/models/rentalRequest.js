const mongoose = require("mongoose");

const rentalRequestSchema = new mongoose.Schema({
	bikeId: { type: mongoose.Schema.Types.ObjectId, ref: "Bike", required: true },
	customerId: { type: String, required: true },
	ownerId: { type: String, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
	totalPrice: { type: Number, default: 0 },
	basePrice: { type: Number, default: 0 },
	status: {
		type: String,
		enum: ["pending", "accepted", "rejected"],
		default: "pending",
	},
	requestedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RentalRequest", rentalRequestSchema);
