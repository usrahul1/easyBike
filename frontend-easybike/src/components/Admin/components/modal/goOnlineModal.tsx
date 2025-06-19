import React, { useEffect, useState } from "react";
import { makeBikeOnline } from "../../../../fetch/fetch";

interface GoOnlineModalProps {
	bikeId: string;
	onClose: () => void;
}

const GoOnlineModal: React.FC<GoOnlineModalProps> = ({ bikeId, onClose }) => {
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [loadingLocation, setLoadingLocation] = useState(true);

	// Automatically fetch user's location
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLatitude(position.coords.latitude);
					setLongitude(position.coords.longitude);
					setLoadingLocation(false);
				},
				(error) => {
					alert("Failed to get your location. Please enable GPS.");
					console.error("Geolocation error:", error);
					setLoadingLocation(false);
				}
			);
		} else {
			alert("Geolocation is not supported by your browser.");
			setLoadingLocation(false);
		}
	}, []);

	const handleSubmit = async () => {
		try {
			const payload = {
				latitude,
				longitude,
				startTime,
				endTime,
			};
			console.log("Payload being sent:", payload); // 🔍 Inspect this

			const res = await makeBikeOnline(bikeId, payload);
			console.log("Success:", res);
			onClose();
		} catch (err) {
			console.error("Error submitting form:", err);
			alert("Failed to go online. Check inputs.");
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
			<div className="bg-base-100 p-6 rounded-xl w-[90%] max-w-md shadow-lg">
				<h2 className="text-xl font-bold mb-4">Go Online</h2>

				{loadingLocation ? (
					<p className="text-sm mb-4 text-warning">Fetching your location...</p>
				) : (
					<>
						<label className="label">Latitude</label>
						<input
							type="number"
							value={latitude}
							onChange={(e) => setLatitude(parseFloat(e.target.value))}
							className="input input-bordered w-full mb-2"
						/>

						<label className="label">Longitude</label>
						<input
							type="number"
							value={longitude}
							onChange={(e) => setLongitude(parseFloat(e.target.value))}
							className="input input-bordered w-full mb-2"
						/>
					</>
				)}

				<label className="label">Start Time</label>
				<input
					type="datetime-local"
					value={startTime}
					onChange={(e) => setStartTime(e.target.value)}
					className="input input-bordered w-full mb-2"
				/>

				<label className="label">End Time</label>
				<input
					type="datetime-local"
					value={endTime}
					onChange={(e) => setEndTime(e.target.value)}
					className="input input-bordered w-full mb-4"
				/>

				<div className="flex justify-end gap-2">
					<button className="btn btn-outline" onClick={onClose}>
						Cancel
					</button>
					<button
						className="btn btn-accent"
						onClick={handleSubmit}
						disabled={loadingLocation}
					>
						Go Online
					</button>
				</div>
			</div>
		</div>
	);
};

export default GoOnlineModal;
