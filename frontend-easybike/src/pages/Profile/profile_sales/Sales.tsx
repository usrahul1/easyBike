import type { FC } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../../../components/Admin/components/ui/table";
import { Check, X } from "lucide-react";
import Button from "../../../components/Admin/components/ui/button/Button";

type User = {
	image: string;
	name: string;
	email: string;
};

type Team = {
	images: string[];
};

type TableItem = {
	id: number;
	user: User;
	projectName: string;
	team: Team;
	budget: string;
	status: "Active" | "Pending" | "Cancel";
};

const tableData: TableItem[] = [
	{
		id: 1,
		user: {
			image: "/images/user/user-17.jpg",
			name: "Lindsey Curtis",
			email: "test@gmail.com",
		},
		projectName: "Agency Website",
		team: {
			images: [
				"/images/user/user-22.jpg",
				"/images/user/user-23.jpg",
				"/images/user/user-24.jpg",
			],
		},
		budget: "3.9K",
		status: "Active",
	},
	{
		id: 2,
		user: {
			image: "/images/user/user-18.jpg",
			name: "Kaiya George",
			email: "test@gmail.com",
		},
		projectName: "Technology",
		team: {
			images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
		},
		budget: "24.9K",
		status: "Pending",
	},
	{
		id: 3,
		user: {
			image: "/images/user/user-17.jpg",
			name: "Zain Geidt",
			email: "test@gmail.com",
		},
		projectName: "Blog Writing",
		team: {
			images: ["/images/user/user-27.jpg"],
		},
		budget: "12.7K",
		status: "Active",
	},
	{
		id: 4,
		user: {
			image: "/images/user/user-20.jpg",
			name: "Abram Schleifer",
			email: "test@gmail.com",
		},
		projectName: "Social Media",
		team: {
			images: [
				"/images/user/user-28.jpg",
				"/images/user/user-29.jpg",
				"/images/user/user-30.jpg",
			],
		},
		budget: "2.8K",
		status: "Cancel",
	},
	{
		id: 5,
		user: {
			image: "/images/user/user-21.jpg",
			name: "Carla George",
			email: "test@gmail.com",
		},
		projectName: "Website",
		team: {
			images: [
				"/images/user/user-31.jpg",
				"/images/user/user-32.jpg",
				"/images/user/user-33.jpg",
			],
		},
		budget: "4.5K",
		status: "Active",
	},
];

const Sales: FC = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-base-100">
			<div className="overflow-hidden rounded-xl shadow-lg border border-base-300 w-full max-w-6xl">
				<div className="overflow-x-auto">
					<Table className="table w-full text-base-content">
						{/* Table Header */}
						<TableHeader className="bg-base-200 text-base-content border-b border-base-300">
							<TableRow>
								<TableCell isHeader className="px-5 py-3 font-bold">
									User
								</TableCell>
								<TableCell isHeader className="px-5 py-3 font-bold">
									Applied Date
								</TableCell>
								<TableCell isHeader className="px-5 py-3 font-bold">
									Show Document
								</TableCell>
								<TableCell isHeader className="px-5 py-3 font-bold">
									Show Profile
								</TableCell>
								<TableCell isHeader className="px-5 py-3 font-bold">
									Action
								</TableCell>
							</TableRow>
						</TableHeader>

						{/* Table Body */}
						<TableBody className="divide-y divide-base-300">
							{tableData.map((order) => (
								<TableRow
									key={order.id}
									className="hover:bg-base-200 transition"
								>
									<TableCell className="px-5 py-4 sm:px-6 text-start">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 overflow-hidden rounded-full">
												<img
													width={40}
													height={40}
													src={order.user.image}
													alt={order.user.name}
												/>
											</div>
											<div>
												<span className="block font-medium">
													{order.user.name}
												</span>
												<span className="block text-sm opacity-70">
													{order.user.email}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell className="px-4 py-3">
										{order.projectName}
									</TableCell>
									<TableCell className="px-4 py-3">
										<Button size="sm" variant="outline">
											Show Document
										</Button>
									</TableCell>
									<TableCell className="px-4 py-3">
										<Button size="sm" variant="outline">
											Show Profile
										</Button>
									</TableCell>
									<TableCell className="px-4 py-3 flex gap-2">
										<Button
											size="sm"
											variant="outline"
											startIcon={<Check size={15} />}
										>
											Accept
										</Button>
										<Button
											size="sm"
											variant="outline"
											startIcon={<X size={15} />}
										>
											Reject
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default Sales;
