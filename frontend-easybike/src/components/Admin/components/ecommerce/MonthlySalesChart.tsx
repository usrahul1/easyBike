import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { getMonthlySales } from "../../../../fetch/fetch";

export default function MonthlySalesChart() {
	const [salesData, setSalesData] = useState<number[]>(new Array(12).fill(0));

	useEffect(() => {
		const fetchSales = async () => {
			try {
				const data = await getMonthlySales();
				setSalesData(data);
			} catch (err) {
				console.error("Failed to fetch sales data");
			}
		};

		fetchSales();
	}, []);

	const options: ApexOptions = {
		colors: ["#3b82f6"], // blue-500 from Tailwind (Daisy default)
		chart: {
			fontFamily: "Outfit, sans-serif",
			type: "bar",
			height: 180,
			toolbar: { show: false },
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: "39%",
				borderRadius: 5,
				borderRadiusApplication: "end",
			},
		},
		dataLabels: { enabled: false },
		stroke: { show: true, width: 4, colors: ["transparent"] },
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			],
			axisBorder: { show: false },
			axisTicks: { show: false },
			labels: { style: { colors: "#9ca3af" } }, // text-gray-400
		},
		yaxis: {
			labels: { style: { colors: "#9ca3af" } }, // text-gray-400
		},
		legend: {
			show: true,
			position: "top",
			horizontalAlign: "left",
			fontFamily: "Outfit",
			labels: { colors: "#6b7280" }, // text-gray-500
		},
		grid: {
			yaxis: { lines: { show: true } },
			borderColor: "#e5e7eb", // border-base-300
		},
		fill: { opacity: 1 },
		tooltip: {
			theme: "light",
			y: { formatter: (val: number) => `${val}` },
		},
	};

	const series = [
		{
			name: "Sales",
			data: salesData,
		},
	];

	return (
		<div className="overflow-hidden rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-base-content">
					Monthly Sales
				</h3>
			</div>

			<div className="max-w-full overflow-x-auto">
				<div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
					<Chart options={options} series={series} type="bar" height={180} />
				</div>
			</div>
		</div>
	);
}
