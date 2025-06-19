import {
	useState,
	useRef,
	useEffect,
	type ChangeEvent,
	type FormEvent,
} from "react";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import styles from "./YourBikes.module.css";
import Card from "../../../components/Card_Bike/Card";
import { useBikeStore } from "../../../store/requestSender";
import toast from "react-hot-toast";
import { getBikesByOwnerId } from "../../../fetch/fetch";

// 🧠 Adjust according to your real shape
interface Profile {
	uid: string;
	name?: string | null;
	email?: string | null;
	photoURL?: string | null;
	createdAt?: string;
	dob?: string | null;
	address?: string | null;
	mobile?: string | null;
}

interface Bike {
	_id: string;
	brand: string;
	model: string;
	pricePerHour: number;
	createdAt?: string;
	frontView?: string;
	backView?: string;
	leftView?: string;
	rightView?: string;
	isOnline: boolean;
}

const YourBikes = () => {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const firstScreenRef = useRef<HTMLDivElement | null>(null);

	const [profile, setProfile] = useState<Profile | null>(null);
	const [addingBikes, setAddingBikes] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [userBikes, setUserBikes] = useState<Bike[]>([]);

	const {
		ownerDetails,
		bikeDetails,
		setOwnerDetails: setOwnerField,
		setBikeDetails: setBikeField,
		submitRegistration,
		setUserId,
	} = useBikeStore();

	useEffect(() => {
		if (!firebase.isLoggedIn) navigate("/login");
	}, [firebase, navigate]);

	useEffect(() => {
		if (profile?.uid) {
			getBikesByOwnerId(profile.uid).then((bikes) => {
				setUserBikes(bikes);
			});
		}
	}, [profile?.uid]);

	useEffect(() => {
		if (!firebase) return;

		const details = firebase.profDetails();

		if (details) {
			setProfile(details);
			setUserId(details.uid);
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

	const handleOwnerChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type, files } = e.target as HTMLInputElement;
		const key = name as keyof typeof ownerDetails;

		if (type === "file" && files) {
			setOwnerField(key, files[0]);
		} else {
			setOwnerField(key, value);
		}
	};

	const handleBikeChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type, files } = e.target as HTMLInputElement;
		const key = name as keyof typeof bikeDetails;

		if (type === "file" && files) {
			setBikeField(key, files[0]);
		} else {
			setBikeField(key, value);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		let success = false;

		try {
			setAddingBikes(true);
			await submitRegistration(firebase);
			success = true;
			toast.success("Submitted successfully!");
		} catch (error) {
			console.error("Submission failed:", error);
			toast.error("Submission failed!");
		} finally {
			setAddingBikes(false);
			if (success) toast.success("Submitted successfully!");
		}
	};

	return (
		<div className="flex flex-col flex-grow">
			{addingBikes ? (
				<div
					className="min-h-screen flex-1 mt-10 px-4 sm:px-6 md:px-8"
					ref={firstScreenRef}
				>
					<form
						onSubmit={handleSubmit}
						className="w-full max-w-6xl mx-auto flex flex-col items-center p-6"
					>
						<h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 select-none cursor-pointer underline underline-offset-4">
							Add your Bike
						</h2>

						<div className="flex items-center gap-2 mb-4">
							<input
								type="checkbox"
								name="isOwner"
								className="checkbox"
								checked={isOwner}
								onChange={() => setIsOwner((prev) => !prev)}
							/>
							<label className="label-text">Is this your bike?</label>
						</div>

						<div className="w-full flex flex-col md:flex-row gap-6 box-border">
							{/* Owner Details */}
							<div className="flex-1 w-full overflow-hidden">
								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">
											Owner Full Name
										</span>
									</label>
									<input
										type="text"
										name="fullName"
										value={
											isOwner ? profile?.name || "" : ownerDetails.fullName
										}
										onChange={handleOwnerChange}
										className="input input-bordered w-full"
										disabled={isOwner}
										required
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">
											Date of Birth
										</span>
									</label>
									<input
										type="date"
										name="dob"
										value={
											isOwner && profile?.dob ? profile.dob : ownerDetails.dob
										}
										onChange={handleOwnerChange}
										className="input input-bordered w-full"
										required
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">
											Permanent Address
										</span>
									</label>
									<input
										type="text"
										name="address"
										value={ownerDetails.address}
										onChange={handleOwnerChange}
										className="input input-bordered w-full"
										required
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">
											Mobile Number
										</span>
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
										className="input input-bordered w-full"
										required
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">Email ID</span>
									</label>
									<input
										type="email"
										name="email"
										value={
											isOwner ? profile?.email ?? "" : ownerDetails.email ?? ""
										}
										onChange={handleOwnerChange}
										className="input input-bordered w-full"
										required
										disabled={isOwner}
									/>
								</div>

								{/* Bike Views */}
								{["frontView", "backView", "rightView", "leftView"].map(
									(view) => (
										<div className="form-control mb-4" key={view}>
											<label className="label">
												<span className="label-text font-semibold break-words text-sm sm:text-base">
													Upload {view.replace("View", "")} Angle View of Bike
													(JPG, JPEG, PNG)
												</span>
											</label>
											<input
												type="file"
												name={view}
												accept="image/*"
												onChange={handleBikeChange}
												className="file-input file-input-bordered w-full"
												required
											/>
										</div>
									)
								)}
							</div>

							{/* Bike Details */}
							<div className="flex-1">
								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">
											Motorbike Brand
										</span>
									</label>
									<input
										type="text"
										name="brand"
										value={bikeDetails.brand}
										onChange={handleBikeChange}
										className="input input-bordered w-full"
										required
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">Model</span>
									</label>
									<input
										type="text"
										name="model"
										value={bikeDetails.model}
										onChange={handleBikeChange}
										className="input input-bordered w-full"
										required
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">Fuel Type</span>
									</label>
									<select
										name="fuelType"
										value={bikeDetails.fuelType}
										onChange={handleBikeChange}
										className="select select-bordered w-full"
										required
									>
										<option value="">-- Select --</option>
										<option value="Petrol">Petrol</option>
										<option value="Electric">Electric</option>
									</select>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">Color</span>
									</label>
									<input
										type="text"
										name="color"
										value={bikeDetails.color}
										onChange={handleBikeChange}
										className="input input-bordered w-full"
										required
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">
											Expected Mileage (Km/L)
										</span>
									</label>
									<input
										type="number"
										name="mileage"
										value={bikeDetails.mileage}
										onChange={handleBikeChange}
										className="input input-bordered w-full"
										required
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text font-semibold">
											Price per Hour
										</span>
									</label>
									<input
										type="number"
										name="pricePerHour"
										value={bikeDetails.pricePerHour}
										onChange={handleBikeChange}
										className="input input-bordered w-full"
										required
									/>
								</div>

								{/* Document Uploads */}
								{[
									{
										name: "rcCertificate",
										label: "RC - Registration Certificate (PDF)",
									},
									{
										name: "pollutionCertificate",
										label: "Pollution Certificate (PDF)",
									},
									{
										name: "insuranceCertificate",
										label: "Insurance Certificate (PDF)",
									},
								].map((doc) => (
									<div className="form-control mb-4" key={doc.name}>
										<label className="label">
											<span className="label-text font-semibold">
												{doc.label}
											</span>
										</label>
										<input
											type="file"
											name={doc.name}
											accept=".pdf"
											onChange={handleBikeChange}
											className="file-input file-input-bordered w-full"
											required
										/>
									</div>
								))}

								<div className="form-control mb-6">
									<label className="label">
										<span className="label-text font-semibold">
											Owner Photo
										</span>
									</label>
									<input
										type="file"
										name="ownerPhoto"
										accept=".jpg,.jpeg,.png"
										onChange={handleOwnerChange}
										className="file-input file-input-bordered w-full"
										required
									/>
								</div>
							</div>
						</div>

						<button
							type="submit"
							className="btn btn-primary mt-6 w-full max-w-xs"
						>
							Submit Registration
						</button>
					</form>
				</div>
			) : (
				<div
					className="min-h-screen flex-1 mt-10 flex flex-col px-4 md:px-8"
					ref={firstScreenRef}
				>
					<div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
						<h3 className="text-2xl md:text-3xl font-semibold select-none cursor-pointer underline">
							Your Bikes
						</h3>
						<i className="fa-solid fa-motorcycle text-xl md:text-2xl"></i>
					</div>

					<div className="mt-6">
						<div className="flex flex-wrap gap-4 justify-start">
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

					<ul
						className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 ${styles.cardContainer}`}
					>
						{userBikes.map((bike) => (
							<li key={bike._id}>
								<Card
									imageUrl={bike.frontView || "https://via.placeholder.com/300"}
									backView={bike.backView || "https://via.placeholder.com/300"}
									leftView={bike.leftView || "https://via.placeholder.com/300"}
									rightView={
										bike.rightView || "https://via.placeholder.com/300"
									}
									thumbUrl={
										profile?.photoURL || "https://i.imgur.com/7D7I6dI.png"
									}
									title={`${bike.brand} ${bike.model}`}
									status={
										bike.createdAt
											? new Date(bike.createdAt).toLocaleDateString()
											: "Recently added"
									}
									price={`${bike.pricePerHour}/hour`}
									showButton={true}
									onClick={() => alert(`Clicked on ${bike.model}`)}
									id={bike._id}
									isOnline={bike.isOnline ?? false}
									ownBike={true}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default YourBikes;
