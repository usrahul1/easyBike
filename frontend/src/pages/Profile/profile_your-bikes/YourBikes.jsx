import { React, useState } from "react";
import SidebarMain from "../../../components/SidebarMain/SidebarMain";

const YourBikes = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};
	return (
		<div>
			<SidebarMain expand={expand} activeTab2={`bike`} />
			your bikes
		</div>
	);
};

export default YourBikes;
