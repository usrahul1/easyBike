const mongoose = require("mongoose");

const upiSchema = new mongoose.Schema({
	userId: {
		type: String, // Firebase UID
		required: true,
		unique: true,
	},
	upiId: {
		type: String,
		required: true,
		match: [/^[\w.-]+@[\w.-]+$/, "Please enter a valid UPI ID"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("UPIDetail", upiSchema);
