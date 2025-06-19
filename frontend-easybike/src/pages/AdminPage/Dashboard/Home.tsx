import type { FC } from "react";

import EcommerceMetrics from "../../../components/Admin/components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../../components/Admin/components/ecommerce/MonthlySalesChart";
import RecentOrders from "../../../components/Admin/components/ecommerce/RecentOrders";
import DemographicCard from "../../../components/Admin/components/ecommerce/DemographicCard";

const Home: FC = () => {
	return (
		<>
			<div className="w-full max-w-7xl mx-auto px-4 space-y-6">
				<div className="flex justify-center">
					<div className="w-full max-w-3xl">
						<EcommerceMetrics />
					</div>
				</div>

				{/* ✅ Centered MonthlySalesChart */}
				<div className="flex justify-center">
					<div className="w-full max-w-3xl">
						<MonthlySalesChart />
					</div>
				</div>

				{/* Rest of the dashboard using grid */}
				<div className="grid grid-cols-12 gap-4 md:gap-6">
					<div className="col-span-12 xl:col-span-5">
						<DemographicCard />
					</div>

					<div className="col-span-12 xl:col-span-7">
						<RecentOrders />
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
