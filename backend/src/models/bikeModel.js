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
	isRented: { type: Boolean, default: false },

	pricePerHour: {
		type: Number,
		required: true,
		default: 50,
	},

	startTime: {
		type: Date,
		required: false, // ✅ changed
	},
	endTime: {
		type: Date,
		required: false, // ✅ changed
	},
	location: {
		type: {
			type: String,
			enum: ["Point"],
			default: "Point",
			required: false, // ✅ added
		},
		coordinates: {
			type: [Number],
			default: [0, 0],
		},
	},
	ownerId: {
		type: String, // Firebase UID
		required: true,
	},

	createdAt: { type: Date, default: Date.now },
});

// Geospatial index
bikeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Bike", bikeSchema);
