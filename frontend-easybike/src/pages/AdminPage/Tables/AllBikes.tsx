import type { FC } from "react";

import PageBreadcrumb from "../../../components/Admin/components/common/PageBreadCrumb";
import ComponentCard from "../../../components/Admin/components/common/ComponentCard";
import PageMeta from "../../../components/Admin/components/common/PageMeta";
// import BasicTableOne from "../../../components/Admin/components/tables/BasicTables/BasicTableOne";
import BikeTable from "../../../components/Admin/components/tables/Bike Addition/BikeTable";

const AllBikes: FC = () => {
	return (
		<>
			<PageMeta
				title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
				description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Bikes" />
			<div className="space-y-6">
				<ComponentCard title="Bike Addition Requests">
					{/* <BasicTableOne /> */}
					<BikeTable />
				</ComponentCard>
			</div>
		</>
	);
};

export default AllBikes;
