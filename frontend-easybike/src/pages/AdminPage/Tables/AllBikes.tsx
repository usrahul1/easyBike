import { type FC, useState, useEffect } from "react";

import PageBreadcrumb from "../../../components/Admin/components/common/PageBreadCrumb";
import ComponentCard from "../../../components/Admin/components/common/ComponentCard";
import BikeTable from "../../../components/Admin/components/tables/allBikes/allBikes";
import { getAllBikes } from "../../../fetch/fetch";
import type { Bike } from "../../../Types/types";

const AllBikes: FC = () => {
	const [bikes, setBikes] = useState<Bike[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBikes = async () => {
			try {
				const { bikes: fetchedBikes } = await getAllBikes();
				setBikes(fetchedBikes);
			} catch (error) {
				console.error("Failed to load bikes:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBikes();
	}, []);

	if (loading) return <h2>Loading.....</h2>;

	return (
		<>
			<PageBreadcrumb pageTitle="Bikes" />
			<div className="space-y-6">
				<ComponentCard title="Bike Addition Requests">
					{/* <BasicTableOne /> */}
					<BikeTable tableData={bikes} />
				</ComponentCard>
			</div>
		</>
	);
};

export default AllBikes;
