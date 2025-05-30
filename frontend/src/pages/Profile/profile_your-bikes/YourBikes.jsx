import { useState, useRef, useEffect } from "react";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import styles from "./YourBikes.module.css";
import Card from "../../../components/Card_Bike/Card";
import { useBikeStore } from "../../../store/requestSender";
import toast from "react-hot-toast";

const YourBikes = () => {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const firstScreenRef = useRef(null);
	const [profile, setProfile] = useState(null);
	const [addingBikes, setAddingBikes] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const {
		ownerDetails,
		bikeDetails,
		setOwnerDetails: setOwnerField,
		setBikeDetails: setBikeField,
		submitRegistration,
	} = useBikeStore();

	useEffect(() => {
		if (!firebase.isLoggedIn) navigate("/login");
	}, [firebase, navigate]);

	useEffect(() => {
		const details = firebase.profDetails();
		if (details) {
			setProfile(details);
		}
	}, [firebase]);

	useEffect(() => {
		if (isOwner && profile) {
			setOwnerField("fullName", profile.name || "");
			setOwnerField("dob", profile.dob || "");
			setOwnerField("address", profile.address || "");
			setOwnerField("mobile", profile.mobile || "");
			setOwnerField("email", profile.email || "");
		} else {
			setOwnerField("fullName", "");
			setOwnerField("dob", "");
			setOwnerField("address", "");
			setOwnerField("mobile", "");
			setOwnerField("email", "");
		}
	}, [isOwner, profile]);

	const handleOwnerChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
			setOwnerField(name, files[0]);
		} else {
			setOwnerField(name, value);
		}
	};

	const handleBikeChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
			setBikeField(name, files[0]);
		} else {
			setBikeField(name, value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let success;
		try {
			setAddingBikes(true);
			await submitRegistration(firebase);
			success = true;
			console.log("done ig");
			toast.success("Submitted successfully!");
		} catch (error) {
			toast.error("Submission failed!");
		} finally {
			setAddingBikes(false);
			console.log("🛑 Done with submission");
			if (success) toast.success("Submitted successfully!");
			else console.error("Submission failed:", error);
		}
	};

	return (
		<div className="flex flex-col flex-grow">
			{addingBikes ? (
				<div className={`h-screen flex-1 mt-10`} ref={firstScreenRef}>
					<form
						onSubmit={handleSubmit}
						className="flex-1 min-w-lg flex justify-center items-center flex-col p-8"
					>
						<h2
							className={`text-2xl font-bold text-center mb-6 w-fit select-none cursor-pointer ${styles.underline}`}
						>
							Add your Bike
						</h2>
						<div className="flex gap-2 items-center mb-4">
							<input
								type="checkbox"
								name="isOwner"
								checked={isOwner}
								onChange={() => setIsOwner((prev) => !prev)}
							/>
							<label>Is this your bike?</label>
						</div>
						<div className="flex justify-center gap-10 w-full">
							{/* Owner Details */}
							<div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Owner Full Name
									</label>
									<input
										type="text"
										name="fullName"
										value={
											isOwner ? profile?.name || "" : ownerDetails.fullName
										}
										onChange={handleOwnerChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Date of Birth
									</label>
									<input
										type="date"
										name="dob"
										value={
											isOwner && profile?.dob ? profile.dob : ownerDetails.dob
										}
										onChange={handleOwnerChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Permanent Address
									</label>
									<input
										type="text"
										name="address"
										value={ownerDetails.address}
										onChange={handleOwnerChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Mobile Number
									</label>
									<input
										type="tel"
										name="mobile"
										pattern="[0-9]{10}"
										value={
											isOwner && profile?.mobile
												? profile.mobile
												: ownerDetails.mobile
										}
										onChange={handleOwnerChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">Email ID</label>
									<input
										type="email"
										name="email"
										value={isOwner ? profile.email : ownerDetails.email}
										onChange={handleOwnerChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload Front Angle View of Bike (JPG, JPEG, PNG)
									</label>
									<input
										type="file"
										name="frontView"
										accept="image/*"
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload Back Angle View of Bike (JPG, JPEG, PNG)
									</label>
									<input
										type="file"
										name="backView"
										accept="image/*"
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload Right Angle View of Bike (JPG, JPEG, PNG)
									</label>
									<input
										type="file"
										name="rightView"
										accept="image/*"
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload Left Angle View of Bike (JPG, JPEG, PNG)
									</label>
									<input
										type="file"
										name="leftView"
										accept="image/*"
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
							</div>
							{/* Vehicle Details */}
							<div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Motorbike Brand
									</label>
									<input
										type="text"
										name="brand"
										value={bikeDetails.brand}
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">Model</label>
									<input
										type="text"
										name="model"
										value={bikeDetails.model}
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">Fuel Type</label>
									<select
										name="fuelType"
										value={bikeDetails.fuelType}
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									>
										<option value="">-- Select --</option>
										<option value="Petrol">Petrol</option>
										<option value="Electric">Electric</option>
									</select>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">Color</label>
									<input
										type="text"
										name="color"
										value={bikeDetails.color}
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Expected Mileage (Km/L)
									</label>
									<input
										type="number"
										name="mileage"
										value={bikeDetails.mileage}
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								{/* Document Uploads */}
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload RC - Registration Certificate (PDF)
									</label>
									<input
										type="file"
										name="rcCertificate"
										accept=".pdf"
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload - Pollution Certificate (PDF)
									</label>
									<input
										type="file"
										name="pollutionCertificate"
										accept=".pdf"
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload - Insurance Certificate (PDF)
									</label>
									<input
										type="file"
										name="insuranceCertificate"
										accept=".pdf"
										onChange={handleBikeChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-6">
									<label className="block font-semibold mb-1">
										Owner Photo (JPEG/PNG)
									</label>
									<input
										type="file"
										name="ownerPhoto"
										accept=".jpg,.jpeg,.png"
										onChange={handleOwnerChange}
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
							</div>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-fit cursor-pointer bg-black text-white font-semibold
							py-2 px-4 hover:bg-gray-800 transition"
						>
							Submit Registration
						</button>
					</form>
				</div>
			) : (
				<div
					className={`h-screen flex-1 mt-10 flex flex-col flex-grow`}
					ref={firstScreenRef}
				>
					<center className="flex items-center justify-center gap-2">
						<h3
							className={`text-3xl font-semibold select-none cursor-pointer ${styles.underline}`}
						>
							Your Bikes
						</h3>
						<i className="fa-solid fa-motorcycle text-2xl"></i>
					</center>
					<div className="ml-[5vw]">
						<div style={{ textAlign: "left" }}>
							<button
								onClick={() => setAddingBikes(!addingBikes)}
								className={`${styles["icon-btn"]} ${styles["add-btn"]} cursor-pointer`}
							>
								<div className={styles["add-icon"]}></div>
								<div className={styles["btn-txt"]}>Add</div>
							</button>
							<button
								className={`${styles["icon-btn"]} ${styles["add-btn"]} cursor-pointer`}
							>
								<div className={styles["btn-txt"]}>Remove</div>
							</button>
						</div>
					</div>
					<ul className={styles.cardContainer}>
						<li>
							<Card
								imageUrl="https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/hunter/loader/desktop/loader-2.jpg"
								thumbUrl="https://i.imgur.com/7D7I6dI.png"
								title="RE Hunter 350"
								status="1 hour ago"
								price="350/hour"
								showButton={true}
								onClick={() => alert("bought!")}
							/>
						</li>
						<li>
							<Card
								imageUrl="https://images.unsplash.com/photo-1595691403533-7f4a52a5b189?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
								thumbUrl="https://i.imgur.com/7D7I6dI.png"
								title="RE Classic 350"
								status="1 day ago"
								price="350/hour"
								showButton={true}
								onClick={() => alert("bought!")}
							/>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default YourBikes;
