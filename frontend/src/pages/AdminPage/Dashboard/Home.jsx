import EcommerceMetrics from "../../../components/Admin/components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../../components/Admin/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../../components/Admin/components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../../components/Admin/components/ecommerce/MonthlyTarget";
import RecentOrders from "../../../components/Admin/components/ecommerce/RecentOrders";
import DemographicCard from "../../../components/Admin/components/ecommerce/DemographicCard";
import PageMeta from "../../../components/Admin/components/common/PageMeta";

export default function Home() {
	return (
		<>
			<div className="grid grid-cols-12 gap-4 md:gap-6">
				<div className="col-span-12 space-y-6 xl:col-span-7">
					<EcommerceMetrics />

					<MonthlySalesChart />
				</div>

				<div className="col-span-12 xl:col-span-5">
					<MonthlyTarget />
				</div>

				<div className="col-span-12">
					<StatisticsChart />
				</div>

				<div className="col-span-12 xl:col-span-5">
					<DemographicCard />
				</div>

				<div className="col-span-12 xl:col-span-7">
					<RecentOrders />
				</div>
			</div>
		</>
	);
}
