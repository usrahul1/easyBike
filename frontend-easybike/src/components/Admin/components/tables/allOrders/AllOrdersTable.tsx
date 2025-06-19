import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
} from "../../ui/table";
import { type RentalRequestType } from "../../../../../Types/types";

interface BikeTableProps {
	tableData: RentalRequestType[];
}

export default function AllOrdersTable({
	tableData,
}: BikeTableProps): JSX.Element {
	return (
		<div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 p-4">
			<Table className="table table-zebra w-full">
				<TableHeader>
					<TableRow>
						<TableCell className="font-bold text-base-content">Bike</TableCell>
						<TableCell className="font-bold text-base-content">
							Start Time
						</TableCell>
						<TableCell className="font-bold text-base-content">
							End Time
						</TableCell>
						<TableCell className="font-bold text-base-content">
							Base Price
						</TableCell>
						<TableCell className="font-bold text-base-content">
							Total Price
						</TableCell>
						<TableCell className="font-bold text-base-content">
							Status
						</TableCell>
						<TableCell className="font-bold text-base-content">
							Requested At
						</TableCell>
					</TableRow>
				</TableHeader>

				<TableBody>
					{tableData.map((request) => (
						<TableRow key={request._id}>
							<TableCell className="text-base-content">
								{request.bikeId?.brand ?? "Unknown"}{" "}
								{request.bikeId?.model ?? ""}
							</TableCell>
							<TableCell className="text-base-content">
								{new Date(request.startTime).toLocaleString()}
							</TableCell>
							<TableCell className="text-base-content">
								{new Date(request.endTime).toLocaleString()}
							</TableCell>
							<TableCell className="text-base-content">
								₹{request.basePrice}
							</TableCell>
							<TableCell className="text-base-content">
								₹{request.totalPrice}
							</TableCell>
							<TableCell>
								<span
									className={
										"badge text-base-100 " +
										(request.status === "accepted"
											? "badge-success"
											: request.status === "pending"
											? "badge-warning"
											: "badge-error")
									}
								>
									{request.status}
								</span>
							</TableCell>
							<TableCell className="text-base-content">
								{new Date(request.requestedAt).toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
