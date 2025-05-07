import { React, useState, useRef, useEffect } from "react";
import Sidebar2 from "../../../components/Sidebar/Sidebar2";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import styles from "./YourBikes.module.css";
import Card from "../../../components/Card_Bike/Card";

const YourBikes = () => {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(true);
	const firstScreenRef = useRef(null);

	const [addingBikes, setAddingBikes] = useState(false);

	const expand = () => {
		setIsExpanded((prev) => !prev);
	};

	useEffect(() => {
		if (!firebase.isLoggedIn) navigate("/login");
	}, [firebase, navigate]);

	// if (addingBikes) {
	// 	return (
	// 		<div className="min-h-screen bg-white text-black flex justify-center items-start py-10">
	// 			<form className="w-full max-w-lg border border-black p-8">
	// 				<h2 className="text-2xl font-bold text-center mb-6">
	// 					Motorbike Registration Form
	// 				</h2>

	// 				{/* Owner Details */}
	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Owner Full Name</label>
	// 					<input
	// 						type="text"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Date of Birth</label>
	// 					<input
	// 						type="date"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Aadhaar Number</label>
	// 					<input
	// 						type="text"
	// 						maxLength="12"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">
	// 						Permanent Address
	// 					</label>
	// 					<input
	// 						type="text"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Mobile Number</label>
	// 					<input
	// 						type="tel"
	// 						pattern="[0-9]{10}"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Email ID</label>
	// 					<input
	// 						type="email"
	// 						className="w-full border border-black p-2 bg-white"
	// 					/>
	// 				</div>

	// 				{/* Vehicle Details */}
	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Motorbike Brand</label>
	// 					<input
	// 						type="text"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Model</label>
	// 					<input
	// 						type="text"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Engine Number</label>
	// 					<input
	// 						type="text"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Chassis Number</label>
	// 					<input
	// 						type="text"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Fuel Type</label>
	// 					<select
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					>
	// 						<option value="">-- Select --</option>
	// 						<option value="Petrol">Petrol</option>
	// 						<option value="Electric">Electric</option>
	// 					</select>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">Color</label>
	// 					<input
	// 						type="text"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				{/* Document Uploads */}
	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">
	// 						Upload Purchase Invoice (PDF)
	// 					</label>
	// 					<input
	// 						type="file"
	// 						accept=".pdf"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-4">
	// 					<label className="block font-semibold mb-1">
	// 						Upload Insurance Copy (PDF)
	// 					</label>
	// 					<input
	// 						type="file"
	// 						accept=".pdf"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				<div className="mb-6">
	// 					<label className="block font-semibold mb-1">
	// 						Owner Photo (JPEG/PNG)
	// 					</label>
	// 					<input
	// 						type="file"
	// 						accept=".jpg,.jpeg,.png"
	// 						className="w-full border border-black p-2 bg-white"
	// 						required
	// 					/>
	// 				</div>

	// 				{/* Submit */}
	// 				<button
	// 					type="submit"
	// 					className="w-full bg-black text-white font-semibold py-2 px-4 hover:bg-gray-800 transition"
	// 				>
	// 					Submit Registration
	// 				</button>
	// 			</form>
	// 		</div>
	// 	);
	// }

	return (
		<div className="flex min-h-screen">
			{/* <SidebarMain expand={expand} activeTab2={`bike`} /> */}
			<Sidebar2 expand={expand} />
			{addingBikes ? (
				<div
					className={`h-screen ${
						isExpanded ? "ml-[18.75rem]" : "ml-20"
					} flex-1 mt-10`}
					ref={firstScreenRef}
				>
					<form className="flex-1 min-w-lg flex justify-center items-center flex-col p-8">
						<h2
							className={`text-2xl font-bold text-center mb-6 w-fit select-none cursor-pointer ${styles.underline}`}
						>
							Add your Bike
						</h2>
						<div className="flex justify-center gap-25 w-full">
							{/* Owner Details */}
							<div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Owner Full Name
									</label>
									<input
										type="text"
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
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Aadhaar Number
									</label>
									<input
										type="text"
										maxLength="12"
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
										pattern="[0-9]{10}"
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">Email ID</label>
									<input
										type="email"
										className="w-full border border-black p-2 bg-white"
									/>
								</div>
								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload Front Angle View of Bike (JPG, JPEG, PNG)
									</label>
									<input
										type="file"
										accept="image/*"
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
										accept="image/*"
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
										accept="image/*"
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
										accept="image/*"
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
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">Model</label>
									<input
										type="text"
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Engine Number
									</label>
									<input
										type="text"
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Chassis Number
									</label>
									<input
										type="text"
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">Fuel Type</label>
									<select
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
										accept=".pdf"
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>

								<div className="mb-4">
									<label className="block font-semibold mb-1">
										Upload Your Identity Proof (PDF)
									</label>
									<input
										type="file"
										accept=".pdf"
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
										accept=".jpg,.jpeg,.png"
										className="w-full border border-black p-2 bg-white"
										required
									/>
								</div>
							</div>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-fit cursor-pointer bg-black text-white font-semibold py-2 px-4 hover:bg-gray-800 transition"
						>
							Submit Registration
						</button>
					</form>
				</div>
			) : (
				<div
					className={`h-screen ${
						isExpanded ? "ml-[18.75rem]" : "ml-20"
					} flex-1 mt-10`}
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
								imageUrl="https://images.unsplash.com/photo-1595691403533-7f4a52a5b189?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwZXJiaWtlfGVufDB8fDB8fHww"
								thumbUrl="https://i.imgur.com/7D7I6dI.png"
								title="RE Hunter 350"
								status="1 hour ago"
								price="350/hour"
								showButton={true}
								onClick={() => alert("bought!")}
							/>
						</li>
					</ul>
					<Footer firstScreenRef={firstScreenRef} />
				</div>
			)}
		</div>
	);
};

export default YourBikes;
