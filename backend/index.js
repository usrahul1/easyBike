const express = require("express");
const http = require("http"); // Required for Socket.IO
const { Server } = require("socket.io");
const { connectDB } = require("./src/lib/db.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173", // Your frontend
		credentials: true,
	})
);

// Create HTTP server to bind with Socket.IO
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// Store connected owners
const connectedUsers = {}; // { ownerId (Firebase UID): socketId }

io.on("connection", (socket) => {
	console.log("✅ Client connected:", socket.id);

	socket.on("register-owner", (ownerId) => {
		connectedUsers[ownerId] = socket.id;
		console.log(`🔗 Registered owner ${ownerId} with socket ${socket.id}`);
	});

	socket.on("disconnect", () => {
		for (const [ownerId, socketId] of Object.entries(connectedUsers)) {
			if (socketId === socket.id) {
				delete connectedUsers[ownerId];
				console.log(`❌ Owner ${ownerId} disconnected`);
				break;
			}
		}
	});
});

// Inject io and connectedUsers into request
app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;
	next();
});

// Routes
app.use("/api", require("./src/routes/requestRouter.js"));

// Start server
server.listen(port, () => {
	console.log(`🚀 Server running on port ${port}`);
	connectDB();
});
