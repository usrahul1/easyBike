import React, { useState } from "react";
import { useFirebase } from "../../../context/Firebase";
import Sidebar2 from "../../../components/Sidebar/Sidebar2";

const Sales = () => {
	const [isExpanded, setIsExpanded] = useState(true);

	const expand = () => {
		setIsExpanded((prev) => !prev);
	};
	return (
		<div className="flex min-h-screen">
			<Sidebar2 expand={expand} />
		</div>
	);
};

export default Sales;
