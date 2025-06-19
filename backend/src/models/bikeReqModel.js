const mongoose = require("mongoose");

const bikeAddition = new mongoose.Schema({
	ownerId: {
		type: String,
		required: true,
	},

	fullName: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	mobile: {
		type: String,
		required: true,
		match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
	},
	email: {
		type: String,
		required: true,
		match: [/.+\@.+\..+/, "Please enter a valid email"],
	},
	ownerPhoto: {
		type: String,
	},

	brand: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	fuelType: {
		type: String,
		enum: ["Petrol", "Electric"],
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	mileage: {
		type: Number,
		required: true,
	},
	rcCertificate: {
		type: String,
	},
	pollutionCertificate: {
		type: String,
	},
	insuranceCertificate: {
		type: String,
	},
	frontView: {
		type: String,
	},
	backView: {
		type: String,
	},
	rightView: {
		type: String,
	},
	leftView: {
		type: String,
	},

	pricePerHour: {
		type: Number,
		required: true,
		default: 100,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("BikeRegistration", bikeAddition);
