import { React, useEffect, useState } from "react";
import SidebarMain from "../../components/SidebarMain/SidebarMain";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};
	useEffect(() => {
		console.log(isExpanded);
	}, [expand]);
	return (
		<div className="relative">
			<SidebarMain expand={expand} />
			<div
				className={`grid grid-cols-2 h-screen
                ${isExpanded ? "ml-70" : "ml-17.5"}
                `}
			>
				<div className="">
					<div className="">
						<div className="flex w-full justify-center">
							<h2 className={`text-2xl  ${styles.dashcenter}`}>
								Which one you want?
							</h2>
						</div>
						<ul className="list-none flex flex-col items-center justify-center">
							<li>
								<div className="border-2 border-black max-w-fit p-5 rounded-lg flex flex-col gap-2">
									<img
										className="w-80 rounded-lg mb-1"
										src="https://cdn.bikedekho.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-06613f885e681c.jpg"
									/>
									<h3 className="text-2xl font-semibold">Bike Name</h3>
									<h4 className="text-xl">
										Available Timings: 1400hrs - 1800hrs
									</h4>
									<h4 className="text-xl">Price/Hour</h4>
									<button className="bg-green-300 w-full border-2 border-black text-2xl rounded-lg select-none cursor-pointer">
										Rent it.
									</button>
								</div>
							</li>
							{/* <li>
								<div className="border-2 border-black w-120">
									<h3>Bike Name</h3>
								</div>
							</li> */}
						</ul>
					</div>
				</div>
				<div className="bg-blue-200"></div>
			</div>
		</div>
	);
};

export default DashboardPage;
