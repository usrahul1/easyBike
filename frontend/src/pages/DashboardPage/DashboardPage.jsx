import React, { useEffect, useState } from "react";
// import SidebarMain from "../../components/SidebarMain/SidebarMain";
import styles from "./DashboardPage.module.css";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import Sidebar2 from "../../components/Sidebar/Sidebar2";
import Card from "../../components/Card_Bike/Card";

const DashboardPage = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const expand = () => {
		setIsExpanded((prev) => !prev);
	};

	const navigate = useNavigate();
	const firebase = useFirebase();

	useEffect(() => {
		if (!firebase.isLoggedIn) navigate("/login");
	}, [firebase, navigate]);

	return (
		<div className="flex min-h-screen">
			{/* <SidebarMain expand={expand} /> */}
			{/* <Sidebar2 expand={expand} /> */}
			<div
				className={`flex-1 overflow-auto relative z-10 grid grid-cols-2 h-screen ${
					isExpanded ? "ml-64" : "ml-20"
				}`}
			>
				<ul className={styles.cardContainer}>
					<Card
						imageUrl="https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/hunter/loader/desktop/loader-2.jpg"
						thumbUrl="https://i.imgur.com/7D7I6dI.png"
						title="RE Hunter 350"
						status="1 hour ago"
						price="350/hour"
						showButton={true}
						onClick={() => alert("bought!")}
					/>
					<Card
						imageUrl="https://images.unsplash.com/photo-1595691403533-7f4a52a5b189?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwZXJiaWtlfGVufDB8fDB8fHww"
						thumbUrl="https://i.imgur.com/7D7I6dI.png"
						title="RE Hunter 350"
						status="1 hour ago"
						price="350/hour"
						showButton={true}
						onClick={() => alert("bought!")}
					/>
				</ul>
				<div></div>
			</div>
		</div>
	);
};

export default DashboardPage;
