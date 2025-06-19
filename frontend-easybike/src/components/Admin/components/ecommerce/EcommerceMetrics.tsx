import {
	ArrowDownIcon,
	ArrowUpIcon,
	BoxIconLine,
	GroupIcon,
} from "../../../../assets/icons";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
import { getTotalUsers, getRentalStats } from "../../../../fetch/fetch";

export default function EcommerceMetrics(): JSX.Element {
	const [totalUsers, setTotalUsers] = useState<number | null>(null);
	const [rentalStats, setRentalStats] = useState<{
		totalRequests: number;
		thisMonth: number;
		lastMonth: number;
		growthPercent: number;
	} | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const users = await getTotalUsers();
				setTotalUsers(users);

				const rentals = await getRentalStats();
				setRentalStats(rentals);
			} catch (error) {
				console.error("Failed to fetch metrics.");
			}
		};

		fetchData();
	}, []);

	const renderGrowthBadge = (growth: number) => {
		const isPositive = growth >= 0;
		const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;
		const color = isPositive ? "success" : "error";

		return (
			<Badge color={color}>
				<Icon />
				{Math.abs(growth).toFixed(2)}%
			</Badge>
		);
	};

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
			{/* Customers Metric */}
			<div className="rounded-xl border border-base-300 bg-base-100 p-5 md:p-6 shadow-sm">
				<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-base-200">
					<GroupIcon className="text-base-content size-6" />
				</div>
				<div className="flex items-end justify-between mt-5">
					<div>
						<span className="text-sm text-base-content/70">Customers</span>
						<h4 className="mt-2 text-xl font-bold text-base-content">
							{totalUsers !== null ? totalUsers.toLocaleString() : "—"}
						</h4>
					</div>
				</div>
			</div>

			{/* Orders Metric */}
			<div className="rounded-xl border border-base-300 bg-base-100 p-5 md:p-6 shadow-sm">
				<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-base-200">
					<BoxIconLine className="text-base-content size-6" />
				</div>
				<div className="flex items-end justify-between mt-5">
					<div>
						<span className="text-sm text-base-content/70">Orders</span>
						<h4 className="mt-2 text-xl font-bold text-base-content">
							{rentalStats ? rentalStats.totalRequests.toLocaleString() : "—"}
						</h4>
					</div>
					{rentalStats ? renderGrowthBadge(rentalStats.growthPercent) : null}
				</div>
			</div>
		</div>
	);
}
