import { React, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import SidebarItem from "../SidebarItem/SidebarItem";
import Sidebar from "../Sidebar/Sidebar";

import {
	Boxes,
	Package,
	Receipt,
	Settings,
	LifeBuoy,
	Bike,
} from "lucide-react";

// export const SidebarContext = createContext();

const SidebarMain = ({ expand, activeTab2 = null }) => {
	const navigate = useNavigate();
	// const [expanded, setExpanded] = useState(true);

	const [activeTab, setActiveTab] = useState({
		dashboard: activeTab2 === null || activeTab2 === "dashboard",
		bike: activeTab2 === "bike",
		package: activeTab2 === "package",
		receipt: activeTab2 === "receipt",
		settings: activeTab2 === "settings",
		lifebuoy: activeTab2 === "lifebuoy",
	});

	const handleTabClick = (tabName) => {
		setActiveTab((prevState) => {
			const newState = Object.keys(prevState).reduce((acc, key) => {
				acc[key] = key === tabName;
				return acc;
			}, {});
			return newState;
		});
	};

	console.log(activeTab2);

	const activeTabKey = Object.keys(activeTab).find((key) => activeTab[key]);

	useEffect(() => {
		navigate(`/${activeTabKey}`);
	}, [activeTab]);

	// if (activeTab2 != null) {
	// 	handleTabClick(activeTab2);
	// }

	return (
		// <SidebarContext.Provider value={{ expanded, setExpanded }}>
		<Sidebar expand={expand}>
			<SidebarItem
				icon={<LayoutDashboard size={20} />}
				text="Dashboard"
				active={activeTab.dashboard}
				handleTabClick={handleTabClick}
				tabName={`dashboard`}
			/>

			<SidebarItem
				icon={<Bike size={20} />}
				text="Your Bikes"
				active={activeTab.bike}
				handleTabClick={handleTabClick}
				tabName={`bike`}
			/>
			<SidebarItem
				icon={<Package size={20} />}
				text="Bookings"
				active={activeTab.package}
				alert
				handleTabClick={handleTabClick}
				tabName={`package`}
			/>
			<SidebarItem
				icon={<Receipt size={20} />}
				text="Billings"
				active={activeTab.receipt}
				handleTabClick={handleTabClick}
				tabName={`receipt`}
			/>

			<hr className="my-3" />

			<SidebarItem
				icon={<Settings size={20} />}
				text="Settings"
				active={activeTab.settings}
				handleTabClick={handleTabClick}
				tabName={`settings`}
			/>
			<SidebarItem
				icon={<LifeBuoy size={20} />}
				text="Help"
				active={activeTab.lifebuoy}
				handleTabClick={handleTabClick}
				tabName={`lifebuoy`}
			/>
		</Sidebar>
		// </SidebarContext.Provider>
	);
};

export default SidebarMain;
