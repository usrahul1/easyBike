import { type FC, useEffect, useState } from "react";

import PageBreadcrumb from "../../../components/Admin/components/common/PageBreadCrumb";
import ComponentCard from "../../../components/Admin/components/common/ComponentCard";
import BasicTableOne from "../../../components/Admin/components/tables/BasicTables/BasicTableOne";
import { getAllUsers } from "../../../fetch/fetch";

const AllProfiles: FC = () => {
	const [users, setUsers] = useState<any[]>([]); // You can define a proper type if needed
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getAllUsers();
				setUsers(data);
			} catch (error) {
				console.error("Failed to fetch users:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	return (
		<>
			<PageBreadcrumb pageTitle="All Profiles" />
			<div className="space-y-6">
				<ComponentCard title="All Registered Users">
					{loading ? (
						<p className="text-center text-gray-500">Loading users...</p>
					) : (
						<BasicTableOne users={users} />
					)}
				</ComponentCard>
			</div>
		</>
	);
};

export default AllProfiles;
