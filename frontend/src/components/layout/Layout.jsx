import React from "react";
import Sidebar2 from "../Sidebar/Sidebar2";
import Header from "../Header/Header";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import Support from "../../pages/Profile/profile_support/Support";

const Layout = () => {
	return (
		<div className="flex">
			<div className="fixed top-0 left-0 h-screen text-white">
				<Sidebar2 />
			</div>

			<div className="ml-64 flex flex-col w-full h-screen overflow-hidden">
				<div className="h-16 bg-white shadow flex-shrink-0">
					<Header />
				</div>
				<div className="flex-1 overflow-y-auto">
					<DashboardPage />
					{/* <Support /> */}
				</div>
			</div>
		</div>
	);
};

export default Layout;
