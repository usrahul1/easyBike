const admin = require("../lib/firebase");

const getUserByUID = async (req, res) => {
	try {
		const uid = req.body.uid;

		if (!uid || typeof uid !== "string" || uid.length > 128) {
			console.log(uid);
			return res.status(400).json({ error: "Invalid UID" });
		}

		const userRecord = await admin.auth().getUser(uid);
		console.log("User data:", userRecord.toJSON());
		res.status(200).json(userRecord.toJSON());
	} catch (error) {
		console.error("Error fetching user:", error);
		res
			.status(500)
			.json({ error: "Failed to fetch user", details: error.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		let allUsers = [];
		let nextPageToken;

		do {
			const result = await admin.auth().listUsers(1000, nextPageToken);
			result.users.forEach((userRecord) => {
				allUsers.push(userRecord.toJSON());
			});
			nextPageToken = result.pageToken;
		} while (nextPageToken);

		res.status(200).json({ users: allUsers });
	} catch (error) {
		console.error("Error listing users:", error);
		res.status(500).json({
			error: "Failed to list users",
			details: error.message,
		});
	}
};

const deleteUserByUID = async (req, res) => {
	try {
		const { uid } = req.body;

		if (!uid || typeof uid !== "string") {
			return res.status(400).json({ error: "Invalid UID" });
		}

		await admin.auth().deleteUser(uid);
		console.log(`Successfully deleted user: ${uid}`);

		res.status(200).json({ message: `User ${uid} deleted successfully.` });
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({
			error: "Failed to delete user",
			details: error.message,
		});
	}
};

const getTotalUsers = async (req, res) => {
	try {
		let totalCount = 0;
		let nextPageToken;

		do {
			const result = await admin.auth().listUsers(1000, nextPageToken);
			totalCount += result.users.length;
			nextPageToken = result.pageToken;
		} while (nextPageToken);

		res.status(200).json({ totalUsers: totalCount });
	} catch (error) {
		console.error("Error getting total user count:", error);
		res.status(500).json({
			error: "Failed to get total user count",
			details: error.message,
		});
	}
};

module.exports = { getUserByUID, getAllUsers, deleteUserByUID, getTotalUsers };
