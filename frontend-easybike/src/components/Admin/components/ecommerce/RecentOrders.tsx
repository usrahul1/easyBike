import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { getLastFiveRentalRequests } from "../../../../fetch/fetch";

interface RentalRequestType {
	bikeId: {
		brand: string;
		model: string;
	};
	customerId: string;
	startTime: string;
	endTime: string;
	status: "pending" | "accepted" | "rejected";
}

export default function RecentOrders(): JSX.Element {
	const [recentRentals, setRecentRentals] = useState<RentalRequestType[]>([]);

	useEffect(() => {
		getLastFiveRentalRequests().then((data) => {
			setRecentRentals(data);
		});
	}, []);

	return (
		<div className="overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-md">
			<div className="max-w-full overflow-x-auto">
				<Table>
					{/* Table Header */}
					<TableHeader className="border-b border-base-300 bg-base-200">
						<TableRow>
							{["Bike", "Start Date", "End Date", "Status"].map((title) => (
								<TableCell
									key={title}
									isHeader
									className="px-5 py-3 text-start font-semibold text-base-content text-sm"
								>
									{title}
								</TableCell>
							))}
						</TableRow>
					</TableHeader>

					{/* Table Body */}
					<TableBody className="divide-y divide-base-300">
						{recentRentals.map((rental, index) => (
							<TableRow key={index}>
								<TableCell className="px-5 py-3 text-start text-sm text-base-content">
									{rental.bikeId?.brand} {rental.bikeId?.model}
								</TableCell>
								<TableCell className="px-5 py-3 text-start text-sm text-base-content">
									{new Date(rental.startTime).toLocaleDateString()}
								</TableCell>
								<TableCell className="px-5 py-3 text-start text-sm text-base-content">
									{new Date(rental.endTime).toLocaleDateString()}
								</TableCell>
								<TableCell className="px-5 py-3 text-start text-sm text-base-content">
									<Badge
										size="sm"
										color={
											rental.status === "accepted"
												? "success"
												: rental.status === "pending"
												? "warning"
												: "error"
										}
									>
										{rental.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
