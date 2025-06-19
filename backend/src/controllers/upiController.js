const UPIDetail = require("../models/upiModel");

// 1. Get current UPI ID for a user
const getUPI = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!userId) {
			return res.status(400).json({ error: "userId is required" });
		}

		const record = await UPIDetail.findOne({ userId });

		if (!record) {
			return res
				.status(200)
				.json({ upiId: null, message: "No UPI ID set yet" });
		}

		res.status(200).json({ upiId: record.upiId });
	} catch (error) {
		console.error("Error fetching UPI:", error);
		res.status(500).json({ error: "Server error" });
	}
};

// 2. Update UPI ID (or create if not exists)
const updateUPI = async (req, res) => {
	try {
		const { userId, upiId } = req.body;

		if (!userId || !upiId) {
			return res.status(400).json({ error: "userId and upiId are required" });
		}

		const updated = await UPIDetail.findOneAndUpdate(
			{ userId },
			{ upiId },
			{ new: true, upsert: true }
		);

		res
			.status(200)
			.json({ message: "UPI updated successfully", data: updated });
	} catch (error) {
		console.error("Error updating UPI:", error);
		res.status(500).json({ error: "Server error" });
	}
};

module.exports = { getUPI, updateUPI };
