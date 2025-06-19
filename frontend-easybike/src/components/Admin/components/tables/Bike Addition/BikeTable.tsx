import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { Check, X } from "lucide-react";
import { type BikeRequest } from "../../../../../Types/types";
import ShowDocsModal from "../../modal/ShowDocsModal";
import { useState, useEffect } from "react";
import { useModal } from "../../modal/useModal";
import ShowProfileModal from "../../modal/ShowProfileModal";
import { getUserByUID } from "../../../../../fetch/fetch";
import {
	acceptBikeRequest,
	rejectBikeRequest,
} from "../../../../../fetch/fetch";

interface BikeTableProps {
	tableData: BikeRequest[];
}

export default function BikeTable({ tableData }: BikeTableProps): JSX.Element {
	const [selectedDocs, setSelectedDocs] = useState<
		{ label: string; url: string }[] | null
	>(null);

	const [priceMap, setPriceMap] = useState<Record<string, number>>({});

	useEffect(() => {
		const initialPrices: Record<string, number> = {};
		tableData.forEach((bike) => {
			initialPrices[bike._id] = bike.pricePerHour;
		});
		setPriceMap(initialPrices);
	}, [tableData]);

	const { openModal } = useModal();
	const [selectedProfile, setSelectedProfile] = useState<{
		uid: string;
		email: string;
		emailVerified: boolean;
		displayName: string;
		photoURL: string;
		disabled: boolean;
		metadata: {
			lastSignInTime: string;
			creationTime: string;
			lastRefreshTime?: string;
		};
		tokensValidAfterTime: string;
		providerData: {
			uid: string;
			displayName: string;
			email: string;
			photoURL: string;
			providerId: string;
		}[];
	} | null>(null);

	const [isProfileOpen, setIsProfileOpen] = useState(false);

	return (
		<>
			<div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
				<div className="max-w-full overflow-x-auto">
					<Table>
						<TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
							<TableRow>
								{[
									"User",
									"Bike Name",
									"Show Document",
									"Show Profile",
									"Price / Hour (₹)", // ✅ New column header
									"Action",
								].map((heading) => (
									<TableCell
										key={heading}
										isHeader
										className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
									>
										{heading}
									</TableCell>
								))}
							</TableRow>
						</TableHeader>

						<TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
							{tableData.length === 0 ? (
								<TableRow>
									<td
										colSpan={6}
										className="text-center py-6 text-gray-500 dark:text-gray-400"
									>
										No data available
									</td>
								</TableRow>
							) : (
								tableData.map((order) => (
									<TableRow key={order.ownerId}>
										<TableCell className="px-5 py-4 sm:px-6 text-start">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 overflow-hidden rounded-full">
													<img
														src={order.ownerPhoto}
														alt={order.fullName}
														width={40}
														height={40}
													/>
												</div>
												<div>
													<p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
														{order.fullName}
													</p>
													<p className="block text-gray-500 text-theme-xs dark:text-gray-400">
														{order.email}
													</p>
												</div>
											</div>
										</TableCell>

										<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
											{order.brand} {order.model}
										</TableCell>

										<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
											<Button
												size="sm"
												variant="outline"
												onClick={() => {
													setSelectedDocs([
														{
															label: "RC Certificate",
															url: order.rcCertificate,
														},
														{
															label: "Pollution Certificate",
															url: order.pollutionCertificate,
														},
														{
															label: "Insurance Certificate",
															url: order.insuranceCertificate,
														},
														{ label: "Front View", url: order.frontView },
														{ label: "Back View", url: order.backView },
														{ label: "Right View", url: order.rightView },
														{ label: "Left View", url: order.leftView },
													]);
													openModal();
												}}
											>
												Show Document
											</Button>
										</TableCell>

										<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
											<Button
												size="sm"
												variant="outline"
												onClick={async () => {
													const data = await getUserByUID(order.ownerId);
													if (data) {
														setSelectedProfile(data);
														setIsProfileOpen(true);
														alert("hi");
														openModal();
													}
												}}
											>
												Show Profile
											</Button>
										</TableCell>

										<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
											<input
												type="number"
												value={priceMap[order._id] || 0}
												className="w-24 px-2 py-1 border border-gray-300 rounded-md dark:bg-transparent dark:border-white/[0.1]"
												onChange={(e) => {
													const newPrice = parseFloat(e.target.value);
													setPriceMap((prev) => ({
														...prev,
														[order._id]: isNaN(newPrice) ? 0 : newPrice,
													}));
												}}
											/>
										</TableCell>

										<TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
											<div className="flex items-center gap-2">
												<Button
													size="sm"
													variant="outline"
													startIcon={<Check size={15} />}
													onClick={async () => {
														try {
															const price = priceMap[order._id];
															await acceptBikeRequest(order._id, price);
															alert("Bike accepted successfully ✅");
														} catch (err) {
															alert("Failed to accept bike ❌");
														}
													}}
												>
													Accept
												</Button>

												<Button
													size="sm"
													variant="outline"
													startIcon={<X size={15} />}
													onClick={async () => {
														try {
															await rejectBikeRequest(order._id);
															alert("Bike request rejected ❌");
															// Optionally: remove this row from UI or refresh parent
														} catch (err) {
															alert("Failed to reject bike");
														}
													}}
												>
													Reject
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{selectedDocs && (
					<ShowDocsModal
						docs={selectedDocs}
						onClose={() => setSelectedDocs(null)}
					/>
				)}

				{selectedProfile && (
					<ShowProfileModal
						isOpen={isProfileOpen}
						onClose={() => setIsProfileOpen(false)}
						profile={selectedProfile}
					/>
				)}
			</div>
		</>
	);
}
