import React from "react";
import Sidebar2 from "../Sidebar/Sidebar2";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import Support from "../../pages/Profile/profile_support/Support";
const Layout = () => {
	return (
		<div className="flex">
			<Sidebar2 />
			<Support />
		</div>
	);
};

export default Layout;
