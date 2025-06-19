const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
	participants: [String], // [customerUID, ownerUID]
	createdAt: { type: Date, default: Date.now },
	bikeId: { type: mongoose.Schema.Types.ObjectId, ref: "Bike" }, // optional
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
