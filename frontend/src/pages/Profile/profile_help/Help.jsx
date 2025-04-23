import { React, useState } from "react";
import SidebarMain from "../../../components/SidebarMain/SidebarMain";

const Help = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};
	return (
		<div>
			<SidebarMain expand={expand} activeTab2={`lifebuoy`} />
			Help page
		</div>
	);
};

export default Help;
