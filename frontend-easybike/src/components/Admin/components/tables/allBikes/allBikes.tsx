import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { X } from "lucide-react";
import { type Bike } from "../../../../../Types/types";
import ShowDocsModal from "../../modal/ShowDocsModal";
import { useState, useEffect } from "react";
import { useModal } from "../../modal/useModal";
import ShowProfileModal from "../../modal/ShowProfileModal";
import { getUserByUID, deleteBike } from "../../../../../fetch/fetch";

interface BikeTableProps {
	tableData: Bike[];
}

export default function BikeTable({ tableData }: BikeTableProps): JSX.Element {
	const [selectedDocs, setSelectedDocs] = useState<
		{ label: string; url: string }[] | null
	>(null);

	const [priceMap, setPriceMap] = useState<Record<string, number>>({});
	const [tableDataState, setTableDataState] = useState<Bike[]>([]);

	useEffect(() => {
		setTableDataState(tableData);

		const initialPrices: Record<string, number> = {};
		tableData.forEach((bike) => {
			initialPrices[bike._id] = bike.pricePerHour;
		});
		setPriceMap(initialPrices);
	}, [tableData]);

	const { openModal } = useModal();
	const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const handleRemoveBike = async (id: string) => {
		const confirmed = confirm("Are you sure you want to delete this bike?");
		if (!confirmed) return;

		try {
			await deleteBike(id);
			setTableDataState((prev) => prev.filter((bike) => bike._id !== id));
			alert("Bike deleted successfully.");
		} catch (error) {
			alert("Failed to delete bike. Please try again.");
		}
	};

	return (
		<>
			<div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
				<div className="max-w-full overflow-x-auto">
					<Table>
						<TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
							<TableRow>
								{[
									"Bike Name",
									"Fuel",
									"Color",
									"Mileage",
									"Show Documents",
									"Show Profile",
									"Price / Hour (₹)",
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
							{tableDataState.map((bike) => (
								<TableRow key={bike._id}>
									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										{bike.brand} {bike.model}
									</TableCell>
									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										{bike.fuelType}
									</TableCell>
									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										{bike.color}
									</TableCell>
									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										{bike.mileage} km/l
									</TableCell>

									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										<Button
											size="sm"
											variant="outline"
											onClick={() => {
												const docs: { label: string; url: string }[] = [];

												if (bike.rcCertificate)
													docs.push({
														label: "RC Certificate",
														url: bike.rcCertificate,
													});
												if (bike.pollutionCertificate)
													docs.push({
														label: "Pollution Certificate",
														url: bike.pollutionCertificate,
													});
												if (bike.insuranceCertificate)
													docs.push({
														label: "Insurance Certificate",
														url: bike.insuranceCertificate,
													});
												if (bike.frontView)
													docs.push({
														label: "Front View",
														url: bike.frontView,
													});
												if (bike.backView)
													docs.push({ label: "Back View", url: bike.backView });
												if (bike.rightView)
													docs.push({
														label: "Right View",
														url: bike.rightView,
													});
												if (bike.leftView)
													docs.push({ label: "Left View", url: bike.leftView });

												if (docs.length) {
													setSelectedDocs(docs);
													openModal();
												} else {
													alert("No documents available for this bike.");
												}
											}}
										>
											Show Documents
										</Button>
									</TableCell>

									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										<Button
											size="sm"
											variant="outline"
											onClick={async () => {
												const data = await getUserByUID(bike.ownerId);
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

									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										<input
											type="number"
											value={priceMap[bike._id] || 0}
											className="w-24 px-2 py-1 border border-gray-300 rounded-md dark:bg-transparent dark:border-white/[0.1]"
											onChange={(e) => {
												const newPrice = parseFloat(e.target.value);
												setPriceMap((prev) => ({
													...prev,
													[bike._id]: isNaN(newPrice) ? 0 : newPrice,
												}));
											}}
										/>
									</TableCell>

									<TableCell className="px-4 py-3 text-theme-sm dark:text-gray-400">
										<Button
											size="sm"
											variant="outline"
											startIcon={<X size={15} />}
											onClick={() => handleRemoveBike(bike._id)}
										>
											Remove
										</Button>
									</TableCell>
								</TableRow>
							))}
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
