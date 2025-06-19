import type { FC } from "react";
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../../components/Admin/components/common/PageBreadCrumb";
import ComponentCard from "../../../components/Admin/components/common/ComponentCard";
import AllOrdersTable from "../../../components/Admin/components/tables/allOrders/AllOrdersTable";
import { getAllRentalRequests } from "../../../fetch/fetch";
import type { RentalRequestType } from "../../../Types/types";

const AllOrders: FC = () => {
	const [tableData, setTableData] = useState<RentalRequestType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const data = await getAllRentalRequests(); // ✅ use imported function
				setTableData(data);
			} catch (error) {
				console.error("Failed to fetch all rental requests", error);
			} finally {
				setLoading(false);
			}
		};
		fetchRequests();
	}, []);

	if (loading) return <div className="p-4">Loading...</div>;

	return (
		<>
			<PageBreadcrumb pageTitle="Bikes" />
			<div className="space-y-6">
				<ComponentCard title="Bike Addition Requests">
					{/* <BasicTableOne /> */}
					<AllOrdersTable tableData={tableData} />
				</ComponentCard>
			</div>
		</>
	);
};

export default AllOrders;
