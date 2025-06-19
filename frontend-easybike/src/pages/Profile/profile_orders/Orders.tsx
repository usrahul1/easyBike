import { type FC, useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../../../components/Admin/components/ui/table";
import { MessageCircle } from "lucide-react";
import Button from "../../../components/Admin/components/ui/button/Button";
import { getOrdersByCustomer, getUserByUID } from "../../../fetch/fetch";
import { useFirebase } from "../../../context/Firebase";
import ShowProfileModal from "../../../components/Admin/components/modal/ShowProfileModal";
import { useModal } from "../../../components/Admin/components/modal/useModal";
import { getBikeBrandModelById } from "../../../fetch/fetch";
import ChatModal from "../../../components/Admin/components/modal/ChatModal";
import { axiosInstance } from "../../../lib/axios";

type RentalRequestType = {
	_id: string;
	bikeId: string; // was { brand, model }
	customerId: string;
	ownerId: string;
	startTime: string;
	endTime: string;
	status: "pending" | "accepted" | "rejected";
	basePrice: number;
	totalPrice: number;
	createdAt?: string;
	brand?: string; // added
	model?: string; // added
};

const Orders: FC = () => {
	const [orders, setOrders] = useState<RentalRequestType[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const firebase = useFirebase();
	const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { openModal } = useModal();
	const [chatRoomId, setChatRoomId] = useState<string | null>(null);
	const [chatPeerId, setChatPeerId] = useState<string | null>(null);
	const [isChatOpen, setIsChatOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const uid = firebase.getUserUID();
			if (uid) {
				setLoading(true);
				setError(null);
				try {
					const data = await getOrdersByCustomer(uid);
					let orders = data.orders || data;

					// Fetch brand/model for each order
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
					setError("Failed to fetch orders");
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

	const renderTableRows = (orderList: RentalRequestType[]) =>
		orderList.map((order) => (
			<TableRow key={order._id} className="hover:bg-base-200 transition">
				<TableCell className="px-5 py-4 sm:px-6">
					<TableCell className="px-5 py-4 sm:px-6">
						{order.brand}
						<br />
						{order.model}
					</TableCell>
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
							const data = await getUserByUID(order.ownerId);
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
				<TableCell className="px-4 py-3 capitalize">{order.status}</TableCell>
				<TableCell className="px-4 py-3">
					<Button
						size="sm"
						variant="outline"
						startIcon={<MessageCircle size={15} />}
						onClick={async () => {
							const customerId = firebase.getUserUID(); // this user
							const ownerId = order.ownerId;
							const bikeId = order.bikeId;

							try {
								const response = await axiosInstance.get(
									"/messages/chatroom/find-or-create",
									{
										params: {
											customerId,
											ownerId,
											bikeId,
										},
									}
								);

								const room = response.data;
								setChatRoomId(room._id);
								setChatPeerId(ownerId);
								setIsChatOpen(true);
							} catch (err) {
								console.error("❌ Failed to open chat", err);
								alert("Could not open chat. Please try again.");
							}
						}}
					>
						Contact
					</Button>
				</TableCell>
			</TableRow>
		));

	const renderTable = (title: string, orderList: RentalRequestType[]) => (
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
							<TableCell isHeader className="px-5 py-3 font-bold">
								Status
							</TableCell>
							<TableCell isHeader className="px-5 py-3 font-bold">
								Contact
							</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody className="divide-y divide-base-300">
						{loading && (
							<TableRow>
								<td colSpan={8} className="text-center py-4">
									Loading...
								</td>
							</TableRow>
						)}

						{error && (
							<TableRow>
								<td colSpan={8} className="text-center text-red-500 py-4">
									{error}
								</td>
							</TableRow>
						)}

						{!loading && !error && orderList.length === 0 && (
							<TableRow>
								<td colSpan={8} className="text-center py-4">
									No orders found.
								</td>
							</TableRow>
						)}

						{renderTableRows(orderList)}
					</TableBody>
				</Table>
			</div>
		</div>
	);

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-100">
			<div className="rounded-xl shadow-lg border border-base-300 w-full max-w-6xl bg-base-100">
				{renderTable("Current Orders", currentOrders)}
				{renderTable("Past Orders", pastOrders)}
			</div>

			{selectedProfile && (
				<ShowProfileModal
					isOpen={isProfileOpen}
					onClose={() => setIsProfileOpen(false)}
					profile={selectedProfile}
				/>
			)}

			{isChatOpen && chatRoomId && chatPeerId && (
				<ChatModal
					roomId={chatRoomId}
					currentUserId={firebase.getUserUID()!}
					peerId={chatPeerId}
					onClose={() => setIsChatOpen(false)}
				/>
			)}
		</div>
	);
};

export default Orders;
