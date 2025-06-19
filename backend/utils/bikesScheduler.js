const cron = require("node-cron");
const Bike = require("../src/models/bikeModel"); // adjust the path as needed

cron.schedule("* * * * *", async () => {
	try {
		const now = new Date();
		const updated = await Bike.updateMany(
			{ isOnline: true, endTime: { $lt: now } },
			{
				$set: {
					isOnline: false,
					location: {
						type: "Point",
						coordinates: [0, 0],
					},
				},
				$unset: {
					startTime: "",
					endTime: "",
				},
			}
		);

		if (updated.modifiedCount > 0) {
			console.log(
				`[${new Date().toLocaleTimeString()}] ✅ Auto-offlined ${
					updated.modifiedCount
				} expired bikes`
			);
		}
	} catch (err) {
		console.error("🚨 Cron job error while auto-offlining bikes:", err);
	}
});
