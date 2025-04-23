import { React, useState } from "react";
import SidebarMain from "../../../components/SidebarMain/SidebarMain";

const Settings = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};
	return (
		<div>
			<SidebarMain expand={expand} activeTab2={`settings`} />
			settings
		</div>
	);
};

export default Settings;
