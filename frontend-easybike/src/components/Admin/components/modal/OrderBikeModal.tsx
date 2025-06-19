import React, { useState } from "react";
import toast from "react-hot-toast";
import { useFirebase } from "../../../../context/Firebase";
import { orderBike } from "../../../../fetch/fetch";

interface OrderBikeModalProps {
	bikeId: string;
	onClose: () => void;
}

const OrderBikeModal: React.FC<OrderBikeModalProps> = ({ bikeId, onClose }) => {
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [loading, setLoading] = useState(false);
	const firebase = useFirebase();

	const handleSubmit = async () => {
		if (!startTime || !endTime) {
			toast.error("Please select start and end time");
			return;
		}
		try {
			setLoading(true);
			const customerId = await firebase.getUserUID();
			if (!customerId) {
				toast.error("User not authenticated");
				setLoading(false);
				return;
			}
			const result = await orderBike({
				bikeId,
				customerId,
				startTime,
				endTime,
			});
			toast.success(result.message);
			setLoading(false);
			onClose();
		} catch (error) {
			toast.error("Failed to order bike");
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div className="bg-base-100 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
				<h2 className="text-xl font-bold mb-4">Order Bike</h2>

				<label className="block mb-2">
					Start Time:
					<input
						type="datetime-local"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						className="input input-bordered w-full mt-1"
					/>
				</label>

				<label className="block mb-4">
					End Time:
					<input
						type="datetime-local"
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						className="input input-bordered w-full mt-1"
					/>
				</label>

				<div className="flex justify-end gap-4">
					<button
						onClick={onClose}
						className="btn btn-ghost"
						disabled={loading}
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="btn btn-primary"
						disabled={loading}
					>
						{loading ? "Ordering..." : "Order"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderBikeModal;
