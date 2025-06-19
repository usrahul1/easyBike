const express = require("express");
const http = require("http"); // Required for Socket.IO
const { Server } = require("socket.io");
const { connectDB } = require("./src/lib/db.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Message = require("./src/models/messageModel");
require("dotenv").config();
require("./utils/bikesScheduler.js");
const ChatRoom = require("./src/models/chatRoom"); // adjust path if needed

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173", "https://easy-bike.vercel.app"],
		credentials: true,
	})
);

// Create HTTP server to bind with Socket.IO
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173", "https://easy-bike.vercel.app"],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

const connectedUsers = {};

io.on("connection", (socket) => {
	console.log("✅ Client connected:", socket.id);

	socket.on("register-owner", (ownerId) => {
		connectedUsers[ownerId] = socket.id;
		console.log(`🔗 Registered owner ${ownerId} with socket ${socket.id}`);
	});

	socket.on("register-customer", (customerId) => {
		connectedUsers[customerId] = socket.id;
		console.log(
			`🔗 Registered customer ${customerId} with socket ${socket.id}`
		);
	});

	socket.on(
		"send-message",
		async ({ roomId, senderId, receiverId, message }) => {
			try {
				const chatRoom = await ChatRoom.findById(roomId);
				if (!chatRoom) {
					return socket.emit("error", "Chat room not found.");
				}

				// ✅ Removed isAccepted check

				const newMsg = await Message.create({
					roomId,
					senderId,
					receiverId,
					message,
				});

				const receiverSocket = connectedUsers[receiverId];
				if (receiverSocket) {
					io.to(receiverSocket).emit("receive-message", newMsg);
				}
			} catch (err) {
				console.error("❌ Error in send-message:", err);
				socket.emit("error", "Server error while sending message.");
			}
		}
	);

	socket.on("call-user", ({ to, offer }) => {
		const receiverSocket = connectedUsers[to];
		if (receiverSocket) {
			io.to(receiverSocket).emit("call-made", { offer, from: socket.id });
		}
	});

	socket.on("make-answer", ({ to, answer }) => {
		io.to(to).emit("answer-made", { answer, from: socket.id });
	});

	socket.on("ice-candidate", ({ to, candidate }) => {
		io.to(to).emit("ice-candidate", { candidate });
	});

	socket.on("disconnect", () => {
		for (const [uid, socketId] of Object.entries(connectedUsers)) {
			if (socketId === socket.id) {
				delete connectedUsers[uid];
				console.log(`❌ User ${uid} disconnected`);
				break;
			}
		}
	});
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;
	next();
});

// Routes
app.use("/api/messages", require("./src/routes/messageRoutes"));
app.use("/api", require("./src/routes/requestRouter.js"));

// Start server
server.listen(port, () => {
	console.log(`🚀 Server running on port ${port}`);
	connectDB();
});
