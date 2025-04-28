import { React, useState } from "react";
import SidebarMain from "../../../components/SidebarMain/SidebarMain";

const YourBookings = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};
	return (
		<div>
			<SidebarMain expand={expand} activeTab2={`package`} />
			<div
				className={`h-screen ${isExpanded ? "ml-70" : "ml-17.5"}
                `}
			>
				<h2>bookings page</h2>
			</div>
		</div>
	);
};

export default YourBookings;
