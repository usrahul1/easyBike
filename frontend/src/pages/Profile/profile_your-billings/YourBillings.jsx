import SidebarMain from "../../../components/SidebarMain/SidebarMain";
import { React, useState, useContext } from "react";
// import { SidebarContext } from "../../../components/Sidebar/Sidebar";

const YourBillings = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};
	// const { expanded, setExpanded } = useContext(SidebarContext);

	return (
		<div>
			<SidebarMain expand={isExpanded} activeTab2={`receipt`} />
			<div
				className={`h-screen ${isExpanded ? "ml-70" : "ml-17.5"}
                `}
			>
				<h2>billings page</h2>
			</div>
		</div>
	);
};

export default YourBillings;
