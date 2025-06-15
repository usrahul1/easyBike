const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
	brand: String,
	model: String,
	fuelType: { type: String, enum: ["Petrol", "Electric"] },
	color: String,
	mileage: Number,
	rcCertificate: String,
	pollutionCertificate: String,
	insuranceCertificate: String,
	frontView: String,
	backView: String,
	rightView: String,
	leftView: String,

	isOnline: { type: Boolean, default: false },
	isRented: { type: Boolean, default: false }, // ✅ New field

	location: {
		type: {
			type: String,
			enum: ["Point"],
			default: "Point",
		},
		coordinates: {
			type: [Number],
			default: [0, 0], // [longitude, latitude]
		},
	},

	ownerId: {
		type: String, // Firebase UID
		required: true,
	},

	createdAt: { type: Date, default: Date.now },
});

// Add geospatial index
bikeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Bike", bikeSchema);
