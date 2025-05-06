import { React, useState, useRef, useEffect } from "react";
import Sidebar2 from "../../../components/Sidebar/Sidebar2";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import styles from "./YourBikes.module.css";
import Card from "../../../components/Card_Bike/Card";

const YourBikes = () => {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(true);
	const firstScreenRef = useRef(null);

	const expand = () => {
		setIsExpanded((prev) => !prev);
	};

	useEffect(() => {
		if (!firebase.isLoggedIn) navigate("/login");
	}, [firebase, navigate]);

	return (
		<div className="flex min-h-screen">
			{/* <SidebarMain expand={expand} activeTab2={`bike`} /> */}
			<Sidebar2 expand={expand} />
			<div
				className={`h-screen ${isExpanded ? "ml-[18.75rem]" : "ml-20"} flex-1`}
				ref={firstScreenRef}
			>
				<h2>your bikes page</h2>

				<ul className={styles.cardContainer}>
					<li>
						<Card
							imageUrl="https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/hunter/loader/desktop/loader-2.jpg"
							thumbUrl="https://i.imgur.com/7D7I6dI.png"
							title="RE Hunter 350"
							status="1 hour ago"
							price="350/hour"
							showButton={true}
							onClick={() => alert("bought!")}
						/>
					</li>
					<li>
						<Card
							imageUrl="https://images.unsplash.com/photo-1595691403533-7f4a52a5b189?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwZXJiaWtlfGVufDB8fDB8fHww"
							thumbUrl="https://i.imgur.com/7D7I6dI.png"
							title="RE Hunter 350"
							status="1 hour ago"
							price="350/hour"
							showButton={true}
							onClick={() => alert("bought!")}
						/>
					</li>
				</ul>
				<Footer firstScreenRef={firstScreenRef} />
			</div>
		</div>
	);
};

export default YourBikes;
