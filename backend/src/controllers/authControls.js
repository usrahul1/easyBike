const express = require("express");
const bcrypt = require("bcrypt");

module.exports.loginUser = async (req, res) => {
	let password = req.body.adminPassword;
	let user = await adminModel.findOne({ name: process.env.NAME });
	let hash = user.password;
	bcrypt.compare(password, hash, (err, result) => {
		if (!result) {
			req.flash("error", "Incorrect password!");
			return res.redirect("/admin/login");
		} else {
			let token = createToken(user);
			res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
			return res.redirect("/admin/prof");
		}
	});
};

module.exports.registerUser = async (req, res) => {
	let name = process.env.NAME;
	let password = req.body.password;
	if ((await adminModel.countDocuments()) > 0) {
		let note = req.flash("error", "Only 1 user allowed!");
		return res.redirect("/admin/login");
	} else {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				let adminCreated = await adminModel.create({
					name,
					password: hash,
				});
				let note = req.flash("note", "User Created!");
				return res.redirect("/admin/login");
			});
		});
	}
};

module.exports.logoutUser = async (req, res) => {
	let token = "";
	res.cookie("token", token);
	res.redirect("/");
};
