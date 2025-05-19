const express = require("express");

const BikeRegistration = require("../models/bikeReqModel");

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

module.exports = bikeReq;
