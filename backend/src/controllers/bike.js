const Bike = require("../models/bikeModel");

const getBikeBrandModelById = async (req, res) => {
	try {
		const { bikeId } = req.params;

		if (!bikeId) {
			return res.status(400).json({ error: "Bike ID is required" });
		}

		const bike = await Bike.findById(bikeId, "brand model"); // Only select brand & model

		if (!bike) {
			return res.status(404).json({ error: "Bike not found" });
		}

		res.status(200).json({ brand: bike.brand, model: bike.model });
	} catch (error) {
		console.error("Error fetching bike:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { getBikeBrandModelById };
