const express = require("express");
const { connectDB } = require("./src/lib/db.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:5173", // set your frontend URL here
		credentials: true, // allow credentials
	})
);

app.use("/api/req", require("./src/routes/requestRouter.js"));

app.listen(port, () => {
	console.log("Server is running on ", port);
	connectDB();
});
