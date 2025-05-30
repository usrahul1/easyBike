import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
// import { BoxIcon } from "../../../icons";
// import Badge from "../../ui/badge/Badge";
import { Check, X } from "lucide-react";

const tableData = [
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

export default function BasicTableOne() {
	return (
		<div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
			<div className="max-w-full overflow-x-auto">
				<Table>
					{/* Table Header */}
					<TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
						<TableRow>
							<TableCell
								isHeader
								className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								User
							</TableCell>
							<TableCell
								isHeader
								className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								Applied Date
							</TableCell>

							<TableCell
								isHeader
								className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								Show Document
							</TableCell>
							<TableCell
								isHeader
								className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								Show Profile
							</TableCell>
							<TableCell
								isHeader
								className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								Action
							</TableCell>
						</TableRow>
					</TableHeader>

					{/* Table Body */}
					<TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
						{tableData.map((order) => (
							<TableRow key={order.id}>
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
											<span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
												{order.user.name}
											</span>
											<span className="block text-gray-500 text-theme-xs dark:text-gray-400">
												{order.user.email}
											</span>
										</div>
									</div>
								</TableCell>
								<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
									{order.projectName}
								</TableCell>
								<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
									{/* <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge> */}
									<Button size="sm" variant="outline">
										Show Document
									</Button>
								</TableCell>

								<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
									{/* <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge> */}
									<Button size="sm" variant="outline">
										Show Profile
									</Button>
								</TableCell>
								<TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-2">
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
	);
}
