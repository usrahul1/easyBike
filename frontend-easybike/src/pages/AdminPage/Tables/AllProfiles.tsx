import type { FC } from "react";

import PageBreadcrumb from "../../../components/Admin/components/common/PageBreadCrumb";
import ComponentCard from "../../../components/Admin/components/common/ComponentCard";
import PageMeta from "../../../components/Admin/components/common/PageMeta";
import BasicTableOne from "../../../components/Admin/components/tables/BasicTables/BasicTableOne";

const AllProfiles: FC = () => {
	return (
		<>
			<PageMeta
				title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
				description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Basic Tables" />
			<div className="space-y-6">
				<ComponentCard title="Basic Table 1">
					<BasicTableOne />
				</ComponentCard>
			</div>
		</>
	);
};

export default AllProfiles;
