import SidebarMain from "../../../components/SidebarMain/SidebarMain";
import { React, useState, useContext } from "react";
import { SidebarContext } from "../../../components/Sidebar/Sidebar";

const YourBillings = () => {
	// const [isExpanded, setIsExpanded] = useState(true);
	// const expand = () => {
	// 	setIsExpanded((prev) => !prev);
	// };
	const { expanded, setExpanded } = useContext(SidebarContext);

	return (
		<div>
			<SidebarMain expand={expanded} activeTab2={`receipt`} />
			billings
		</div>
	);
};

export default YourBillings;
