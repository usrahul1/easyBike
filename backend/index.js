const express = require("express");
const { connectDB } = require("./src/lib/db.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
	console.log("Server is running on ", port);
	connectDB();
});
