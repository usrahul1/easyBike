import { React, useState } from "react";
import SidebarMain from "../../../components/SidebarMain/SidebarMain";

const Help = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};
	return (
		<div className="relative">
			<SidebarMain expand={expand} activeTab2={`lifebuoy`} />
			<div
				className={`h-screen ${isExpanded ? "ml-70" : "ml-17.5"}
                `}
			>
				<h2>help page</h2>
			</div>
		</div>
	);
};

export default Help;
