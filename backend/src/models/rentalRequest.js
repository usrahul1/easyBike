const mongoose = require("mongoose");

const rentalRequestSchema = new mongoose.Schema({
	bikeId: { type: mongoose.Schema.Types.ObjectId, ref: "Bike", required: true },
	customerId: { type: String, required: true }, // Firebase UID
	ownerId: { type: String, required: true }, // Firebase UID
	status: {
		type: String,
		enum: ["pending", "accepted", "rejected"],
		default: "pending",
	},
	requestedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RentalRequest", rentalRequestSchema);
