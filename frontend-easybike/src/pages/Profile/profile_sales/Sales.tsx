import { type FC, useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../../../components/Admin/components/ui/table";
import { Check, X, MessageCircle } from "lucide-react";
import Button from "../../../components/Admin/components/ui/button/Button";
import {
	getOrdersByOwner,
	getUserByUID,
	getBikeBrandModelById,
} from "../../../fetch/fetch";
import { useFirebase } from "../../../context/Firebase";
import ShowProfileModal from "../../../components/Admin/components/modal/ShowProfileModal";
import { useModal } from "../../../components/Admin/components/modal/useModal";
import { handleRentalRequestAction } from "../../../fetch/fetch";
import { axiosInstance } from "../../../lib/axios";
import ChatModal from "../../../components/Admin/components/modal/ChatModal";

type RentalRequestType = {
	_id: string;
	bikeId: string;
	customerId: string;
	ownerId: string;
	startTime: string;
	endTime: string;
	status: "pending" | "accepted" | "rejected";
	basePrice: number;
	totalPrice: number;
	createdAt?: string;
	brand?: string;
	model?: string;
};

const Sales: FC = () => {
	const [orders, setOrders] = useState<RentalRequestType[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const firebase = useFirebase();
	const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { openModal } = useModal();
	const [chatRoomId, setChatRoomId] = useState<string | null>(null);
	const [chatUserId, setChatUserId] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const uid = firebase.getUserUID();
			if (uid) {
				setLoading(true);
				setError(null);
				try {
					const data = await getOrdersByOwner(uid);
					let orders = data.orders || data;

					const updatedOrders = await Promise.all(
						orders.map(async (order: RentalRequestType) => {
							try {
								const bikeInfo = await getBikeBrandModelById(order.bikeId);
								return {
									...order,
									brand: bikeInfo.brand,
									model: bikeInfo.model,
								};
							} catch (err) {
								console.error("Failed to fetch bike info for:", order.bikeId);
								return { ...order, brand: "N/A", model: "" };
							}
						})
					);

					setOrders(updatedOrders);
				} catch (err) {
					setError("Failed to fetch sales data");
					console.error(err);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchData();
	}, [firebase]);

	const now = new Date();
	const currentOrders = orders.filter((order) => new Date(order.endTime) > now);
	const pastOrders = orders.filter((order) => new Date(order.endTime) <= now);

	const renderTableRows = (
		orderList: RentalRequestType[],
		showAction: boolean
	) =>
		orderList.map((order) => (
			<TableRow key={order._id} className="hover:bg-base-200 transition">
				<TableCell className="px-5 py-4 sm:px-6">
					{order.brand}
					<br />
					{order.model}
				</TableCell>
				<TableCell className="px-4 py-3">
					{new Date(order.startTime).toLocaleString()}
				</TableCell>
				<TableCell className="px-4 py-3">
					{new Date(order.endTime).toLocaleString()}
				</TableCell>
				<TableCell className="px-4 py-3">
					₹{order.basePrice.toFixed(2)}
				</TableCell>
				<TableCell className="px-4 py-3">
					₹{order.totalPrice.toFixed(2)}
				</TableCell>
				<TableCell className="px-4 py-3">
					<Button
						size="sm"
						variant="outline"
						onClick={async () => {
							const data = await getUserByUID(order.customerId);
							if (data) {
								setSelectedProfile(data);
								setIsProfileOpen(true);
								openModal();
							}
						}}
					>
						Show Profile
					</Button>
				</TableCell>
				{!showAction && (
					<TableCell className="px-4 py-3 capitalize">{order.status}</TableCell>
				)}
				<TableCell className="px-4 py-3">
					<Button
						size="sm"
						variant="outline"
						startIcon={<MessageCircle size={15} />}
						onClick={async () => {
							try {
								const response = await axiosInstance.get(
									`/messages/chatroom/find-or-create`,
									{
										params: {
											customerId: order.customerId,
											ownerId: order.ownerId,
											bikeId: order.bikeId,
										},
									}
								);
								setChatRoomId(response.data._id);
								setChatUserId(order.customerId); // or ownerId depending on role
							} catch (err) {
								console.error("Failed to open chat", err);
								alert("Failed to open chat");
							}
						}}
					>
						Contact
					</Button>
				</TableCell>
				{showAction && (
					<TableCell className="px-4 py-3 flex gap-2 flex-col">
						<Button
							size="sm"
							variant="outline"
							startIcon={<Check size={15} />}
							onClick={async () => {
								try {
									await handleRentalRequestAction(order._id, "accept");
									setOrders((prev) =>
										prev.map((o) =>
											o._id === order._id ? { ...o, status: "accepted" } : o
										)
									);
								} catch (err) {
									console.error("Failed to accept request", err);
									alert("Failed to accept request");
								}
							}}
						>
							Accept
						</Button>
						<br />
						<Button
							size="sm"
							variant="outline"
							startIcon={<X size={15} />}
							onClick={async () => {
								try {
									await handleRentalRequestAction(order._id, "reject");
									setOrders((prev) =>
										prev.map((o) =>
											o._id === order._id ? { ...o, status: "rejected" } : o
										)
									);
								} catch (err) {
									console.error("Failed to reject request", err);
									alert("Failed to reject request");
								}
							}}
						>
							Reject
						</Button>
					</TableCell>
				)}
			</TableRow>
		));

	const renderTable = (
		title: string,
		orderList: RentalRequestType[],
		showAction: boolean
	) => (
		<div className="mb-8">
			<h2 className="text-xl font-semibold px-6 py-4 border-b border-base-300 bg-base-200">
				{title}
			</h2>
			<div className="overflow-x-auto">
				<Table className="table w-full text-base-content">
					<TableHeader className="bg-base-200 text-base-content border-b border-base-300">
						<TableRow>
							<TableCell isHeader className="px-5 py-3 font-bold">
								Bike
							</TableCell>
							<TableCell isHeader className="px-5 py-3 font-bold">
								Start Time
							</TableCell>
							<TableCell isHeader className="px-5 py-3 font-bold">
								End Time
							</TableCell>
							<TableCell isHeader className="px-5 py-3 font-bold">
								Price Per Hour
							</TableCell>
							<TableCell isHeader className="px-5 py-3 font-bold">
								Total Price
							</TableCell>
							<TableCell isHeader className="px-5 py-3 font-bold">
								Profile
							</TableCell>
							{!showAction && (
								<TableCell isHeader className="px-5 py-3 font-bold">
									Status
								</TableCell>
							)}

							<TableCell isHeader className="px-5 py-3 font-bold">
								Contact
							</TableCell>
							{showAction && (
								<TableCell isHeader className="px-5 py-3 font-bold">
									Action
								</TableCell>
							)}
						</TableRow>
					</TableHeader>
					<TableBody className="divide-y divide-base-300">
						{loading && (
							<TableRow>
								<td colSpan={showAction ? 9 : 8} className="text-center py-4">
									Loading...
								</td>
							</TableRow>
						)}

						{error && (
							<TableRow>
								<td
									colSpan={showAction ? 9 : 8}
									className="text-center text-red-500 py-4"
								>
									{error}
								</td>
							</TableRow>
						)}

						{!loading && !error && orderList.length === 0 && (
							<TableRow>
								<td colSpan={showAction ? 9 : 8} className="text-center py-4">
									No orders found.
								</td>
							</TableRow>
						)}

						{renderTableRows(orderList, showAction)}
					</TableBody>
				</Table>
			</div>
		</div>
	);

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-100">
			<div className="rounded-xl shadow-lg border border-base-300 w-full max-w-6xl bg-base-100">
				{renderTable("Current Orders (Your Bikes)", currentOrders, true)}
				{renderTable("Past Orders (Your Bikes)", pastOrders, false)}
			</div>

			{selectedProfile && (
				<ShowProfileModal
					isOpen={isProfileOpen}
					onClose={() => setIsProfileOpen(false)}
					profile={selectedProfile}
				/>
			)}

			{chatRoomId && chatUserId && (
				<ChatModal
					roomId={chatRoomId}
					currentUserId={firebase.getUserUID()!}
					peerId={chatUserId}
					onClose={() => setChatRoomId(null)}
				/>
			)}
		</div>
	);
};

export default Sales;
