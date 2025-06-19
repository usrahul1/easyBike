import type { FC } from "react";
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../../components/Admin/components/common/PageBreadCrumb";
import ComponentCard from "../../../components/Admin/components/common/ComponentCard";
import BikeTable from "../../../components/Admin/components/tables/Bike Addition/BikeTable";
import { type BikeRequest } from "../../../Types/types";
import { axiosInstance } from "../../../lib/axios";

const Bikes: FC = () => {
	const [tableData, setTableData] = useState<BikeRequest[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const res = await axiosInstance.get("/all_bike_req");
				setTableData(res.data);
			} catch (error) {
				console.error("Failed to fetch bike requests", error);
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
					<BikeTable tableData={tableData} />
				</ComponentCard>
			</div>
		</>
	);
};

export default Bikes;
