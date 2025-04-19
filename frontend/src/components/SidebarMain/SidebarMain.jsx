import { React, useEffect, useState } from "react";
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

const SidebarMain = ({ expand }) => {
	// useEffect(() => {
	// 	console.log("useEffect triggered, activeItem:", activeItem);
	// }, []);

	const [activeTab, setActiveTab] = useState({
		dashboard: true,
		bike: false,
		package: false,
		receipt: false,
		billings: false,
		settings: false,
		lifebuoy: false,
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

	return (
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
	);
};

export default SidebarMain;
