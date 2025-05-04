import { React, useEffect, useState } from "react";
import SidebarMain from "../../components/SidebarMain/SidebarMain";
import styles from "./DashboardPage.module.css";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import Sidebar2 from "../../components/Sidebar/Sidebar2";

const DashboardPage = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};

	const navigate = useNavigate();
	const firebase = useFirebase();

	useEffect(() => {
		if (!firebase.isLoggedIn) navigate("/login");
	}, [firebase, navigate]);

	return (
		<div className="flex min-h-screen">
			{/* <SidebarMain expand={expand} /> */}
			<Sidebar2 expand={expand} />
			<div
				// className={`
				// ${isExpanded ? "ml-70" : "ml-17.5"}
				className={`flex-1 overflow-auto relative z-10 grid grid-cols-2 h-screen ${
					isExpanded ? "ml-64" : "ml-20"
				}`}
			>
				<div className="">
					<div className="">
						<div className="flex w-full justify-center items-center">
							<h2
								className={`text-2xl  ${styles.dashcenter} mt-2 mb-2 select-none font-500`}
							>
								Which one you want?
							</h2>
							{/* <input className="border-2 border-black h-2 p-2 " /> */}
						</div>
						<ul className="list-none flex flex-col items-center justify-center flex-wrap">
							<li>
								<div className="border-2 border-black max-w-fit p-5 rounded-lg flex flex-col gap-2 items-center">
									<img
										className="w-80 rounded-lg mb-1 border-2"
										src="https://cdn.bikedekho.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-06613f885e681c.jpg"
									/>
									<div className="flex flex-col gap-2">
										<div className="flex gap-2 items-center justify-between">
											<h3 className="text-2xl font-semibold">Bike Name</h3>
											<button className={`cursor-pointer ${styles.dashcenter}`}>
												Show Location
											</button>
										</div>
										<h4 className="text-xl">
											Available Timings: 1400hrs - 1800hrs
										</h4>
										<h4 className="text-xl">Price/Hour</h4>
										<button className="bg-green-300 w-full border-2 border-black text-2xl rounded-lg select-none cursor-pointer">
											Rent it.
										</button>
									</div>
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
