const router = require("express").Router();
const Message = require("../models/messageModel");
const ChatRoom = require("../models/chatRoom");

// 1. Specific route first
router.get("/chatroom/find-or-create", async (req, res) => {
	const { customerId, ownerId, bikeId } = req.query;

	try {
		let room = await ChatRoom.findOne({
			participants: { $all: [customerId, ownerId] },
			bikeId,
		});

		if (!room) {
			room = await ChatRoom.create({
				participants: [customerId, ownerId],
				bikeId,
			});
		}

		res.status(200).json(room);
	} catch (err) {
		console.error("Error creating chat room:", err);
		res.status(500).json({ error: "Server error" });
	}
});

// 2. Then generic room ID route
router.get("/:roomId", async (req, res) => {
	try {
		const { roomId } = req.params;

		const chatRoom = await ChatRoom.findById(roomId);
		if (!chatRoom) {
			return res.status(404).json({ error: "Chat room not found" });
		}

		const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
		res.status(200).json(messages);
	} catch (err) {
		console.error("❌ Error fetching messages:", err);
		res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
