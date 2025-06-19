const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ChatRoom", // 🔁 Change this to ChatRoom if moving fully to DM-style
		required: true,
	},
	senderId: { type: String, required: true },
	receiverId: { type: String, required: true },
	message: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
	isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model("Message", messageSchema);
