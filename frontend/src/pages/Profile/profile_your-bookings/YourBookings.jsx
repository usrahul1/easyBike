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
			bookings
		</div>
	);
};

export default YourBookings;
