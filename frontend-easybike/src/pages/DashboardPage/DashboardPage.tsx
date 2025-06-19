import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card_Bike/Card";
import { getNearbyBikes } from "../../fetch/fetch";
import { toast } from "react-hot-toast";
import type { Bike } from "../../Types/types";

const DashboardPage: React.FC = () => {
	const [nearbyBikes, setNearbyBikes] = useState<
		(Bike & { distanceInKm: number })[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState<string | null>(null);

	const navigate = useNavigate();
	const firebase = useFirebase();

	useEffect(() => {
		const fetchUserId = async () => {
			try {
				const token = await firebase.getUserUID();
				if (!token) {
					toast.error("User authentication failed");
					navigate("/login");
					return;
				}
				setUserId(token);
			} catch (err: any) {
				console.error("Error getting user ID:", err);
				toast.error("Authentication error");
			}
		};

		if (firebase.isLoggedIn) fetchUserId();
		else navigate("/login");
	}, [firebase, navigate]);

	useEffect(() => {
		if (!userId) return;

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				const { latitude, longitude } = pos.coords;
				try {
					const data = await getNearbyBikes({
						latitude,
						longitude,
						customerId: userId,
					});
					setNearbyBikes(data.bikes);
				} catch (error) {
					toast.error("Failed to load nearby bikes.");
				} finally {
					setLoading(false);
				}
			},
			(err) => {
				console.error("Location access denied:", err);
				toast.error("Please allow location access");
				setLoading(false);
			}
		);
	}, [userId]);

	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-1 overflow-auto px-4 py-6">
				<ul
					className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${styles.cardContainer}`}
				>
					{loading ? (
						<p className="text-center text-lg col-span-full">
							Loading bikes nearby...
						</p>
					) : nearbyBikes.length === 0 ? (
						<p className="text-center text-lg col-span-full">
							No bikes found nearby.
						</p>
					) : (
						nearbyBikes.map((bike) => (
							<li key={bike._id}>
								<Card
									imageUrl={bike.frontView || "https://via.placeholder.com/300"}
									backView={bike.backView}
									leftView={bike.leftView}
									rightView={bike.rightView}
									thumbUrl="https://i.imgur.com/7D7I6dI.png"
									title={`${bike.brand} ${bike.model}`}
									status={`~${bike.distanceInKm} km away`}
									price={`${bike.pricePerHour}/hour`}
									showButton={true}
									onClick={() => alert(`Request to rent ${bike.model}`)}
									id={bike._id}
									isOnline={bike.isOnline}
								/>
							</li>
						))
					)}
				</ul>
			</div>
		</div>
	);
};

export default DashboardPage;
