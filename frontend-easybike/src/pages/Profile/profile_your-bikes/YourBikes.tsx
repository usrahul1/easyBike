import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import styles from "./YourBikes.module.css";
import Card from "../../../components/Card_Bike/Card";
import { useBikeStore } from "../../../store/requestSender";
import toast from "react-hot-toast";

const YourBikes = () => {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const firstScreenRef = useRef<HTMLDivElement>(null);
	const [profile, setProfile] = useState<any>(null);
	const [addingBikes, setAddingBikes] = useState<boolean>(false);
	const [isOwner, setIsOwner] = useState<boolean>(false);

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

	const handleOwnerChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, files } = e.target;
		if (type === "file" && files) {
			setOwnerField(name, files[0]);
		} else {
			setOwnerField(name, value);
		}
	};

	const handleBikeChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type, files } = e.target as HTMLInputElement;
		if (type === "file" && files) {
			setBikeField(name, files[0]);
		} else {
			setBikeField(name, value);
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
			toast.error("Submission failed!");
			console.error("Submission failed:", error);
		} finally {
			setAddingBikes(false);
		}
	};

	return (
		<div className="flex flex-col flex-grow">
			{addingBikes ? (
				<div className={`h-screen flex-1 mt-10`} ref={firstScreenRef}>
					{/* form JSX unchanged */}
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
