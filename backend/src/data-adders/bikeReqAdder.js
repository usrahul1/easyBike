const express = require("express");

const BikeRegistration = require("../models/bikeReqModel");
const Bike = require("../models/bikeModel");

const bikeReq = async (req, res) => {
	try {
		console.log("Received bike registration data:", req.body);

		const newBikeReg = await BikeRegistration.create({
			fullName: req.body.fullName,
			dob: req.body.dob,
			address: req.body.address,
			mobile: req.body.mobile,
			email: req.body.email,
			ownerPhoto: req.body.ownerPhoto,
			brand: req.body.brand,
			model: req.body.model,
			fuelType: req.body.fuelType,
			color: req.body.color,
			mileage: req.body.mileage,
			rcCertificate: req.body.rcCertificate,
			pollutionCertificate: req.body.pollutionCertificate,
			insuranceCertificate: req.body.insuranceCertificate,
			frontView: req.body.frontView,
			backView: req.body.backView,
			rightView: req.body.rightView,
			leftView: req.body.leftView,
		});

		console.log("Bike registration saved:", newBikeReg);
		res.status(201).json({
			message: "Bike registration added successfully",
			bike: newBikeReg,
		});
	} catch (err) {
		console.error("Error adding bike registration:", err);
		res.status(500).json({ error: "Failed to add bike registration" });
	}
};

const acceptBike = async (req, res) => {
	try {
		const { id } = req.params;

		// Fetch the pending bike registration
		const request = await BikeRegistration.findById(id);
		if (!request) {
			return res.status(404).json({ error: "Bike request not found" });
		}

		// Create a new bike in the main Bike collection with ownerId
		const acceptedBike = await Bike.create({
			brand: request.brand,
			model: request.model,
			fuelType: request.fuelType,
			color: request.color,
			mileage: request.mileage,
			rcCertificate: request.rcCertificate,
			pollutionCertificate: request.pollutionCertificate,
			insuranceCertificate: request.insuranceCertificate,
			frontView: request.frontView,
			backView: request.backView,
			rightView: request.rightView,
			leftView: request.leftView,
			ownerId: request.ownerId, // ✅ include ownerId from Firebase
		});

		// Delete the pending request after accepting
		await BikeRegistration.findByIdAndDelete(id);

		res.status(200).json({
			message: "Bike request accepted and added to main listing",
			bike: acceptedBike,
		});
	} catch (error) {
		console.error("Error accepting bike request:", error);
		res.status(500).json({ error: "Failed to accept bike request" });
	}
};

module.exports = { bikeReq, acceptBike };
