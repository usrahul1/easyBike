// import { React, useEffect, useState } from "react";
// import SidebarMain from "../../components/SidebarMain/SidebarMain";
// import styles from "./DashboardPage.module.css";
// import { useFirebase } from "../../context/Firebase";
// import { useNavigate } from "react-router-dom";
// import Sidebar2 from "../../components/Sidebar/Sidebar2";

// const DashboardPage = () => {
// 	const [isExpanded, setIsExpanded] = useState(true);
// 	const expand = () => {
// 		setIsExpanded((prev) => !prev);
// 	};

// 	const navigate = useNavigate();
// 	const firebase = useFirebase();

// 	useEffect(() => {
// 		if (!firebase.isLoggedIn) navigate("/login");
// 	}, [firebase, navigate]);

// 	return (
// 		<div className="flex min-h-screen">
// 			{/* <SidebarMain expand={expand} /> */}
// 			<Sidebar2 expand={expand} />
// 			<div
// 				// className={`
// 				// ${isExpanded ? "ml-70" : "ml-17.5"}
// 				className={`flex-1 overflow-auto relative z-10 grid grid-cols-2 h-screen ${
// 					isExpanded ? "ml-64" : "ml-20"
// 				}`}
// 			>
// 				<div className="">
// 					<div className="">
// 						<ul className="list-none flex flex-col items-center justify-center flex-wrap"></ul>
// 					</div>
// 				</div>
// 				<div className="bg-blue-200"></div>
// 			</div>
// 		</div>
// 	);
// };

// export default DashboardPage;

import React, { useEffect, useState } from "react";
import SidebarMain from "../../components/SidebarMain/SidebarMain";
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
			<Sidebar2 expand={expand} />
			<div
				className={`flex-1 overflow-auto relative z-10 grid grid-cols-2 h-screen ${
					isExpanded ? "ml-64" : "ml-20"
				}`}
			>
				<ul className={styles.cardContainer}>
					<li>
						<a href="#" className={styles.card}>
							<img
								src="https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/hunter/loader/desktop/loader-2.jpg"
								className={styles.card__image}
								alt=""
							/>
							<div className={styles.card__overlay}>
								<div className={styles.card__header}>
									<svg
										className={styles.card__arc}
										xmlns="http://www.w3.org/2000/svg"
									>
										<path />
									</svg>
									<img
										className={styles.card__thumb}
										src="https://i.imgur.com/7D7I6dI.png"
										alt=""
									/>
									<div className={styles.card__headerText}>
										<h3 className={styles.card__title}>RE Hunter 350</h3>
										<span className={styles.card__status}>1 hour ago</span>
									</div>
								</div>
								{/* <p className={styles.card__description}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Asperiores, blanditiis?
								</p> */}
								<div className={styles.card__description}>
									<p className="text-lg text-black">Price: 350/hour</p>
									<button className="m-auto" onClick={() => alert("bought!")}>
										Order
									</button>
								</div>
							</div>
						</a>
					</li>

					<li>
						<a href="#" className={styles.card}>
							<img
								src="https://images.unsplash.com/photo-1595691403533-7f4a52a5b189?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwZXJiaWtlfGVufDB8fDB8fHww"
								className={styles.card__image}
								alt=""
							/>
							<div className={styles.card__overlay}>
								<div className={styles.card__header}>
									<svg
										className={styles.card__arc}
										xmlns="http://www.w3.org/2000/svg"
									>
										<path />
									</svg>
									<img
										className={styles.card__thumb}
										src="https://i.imgur.com/sjLMNDM.png"
										alt=""
									/>
									<div className={styles.card__headerText}>
										<h3 className={styles.card__title}>Kim Cattrall</h3>
										<span className={styles.card__status}>3 hours ago</span>
									</div>
								</div>
								<p className={styles.card__description}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Asperiores, blanditiis?
								</p>
							</div>
						</a>
					</li>

					<li>
						<a href="#" className={styles.card}>
							<img
								src="https://i.imgur.com/oYiTqum.jpg"
								className={styles.card__image}
								alt=""
							/>
							<div className={styles.card__overlay}>
								<div className={styles.card__header}>
									<svg
										className={styles.card__arc}
										xmlns="http://www.w3.org/2000/svg"
									>
										<path />
									</svg>
									<img
										className={styles.card__thumb}
										src="https://i.imgur.com/7D7I6dI.png"
										alt=""
									/>
									<div className={styles.card__headerText}>
										<h3 className={styles.card__title}>Jessica Parker</h3>
										<span className={styles.card__tagline}>
											Lorem ipsum dolor sit amet consectetur
										</span>
										<span className={styles.card__status}>1 hour ago</span>
									</div>
								</div>
								<p className={styles.card__description}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Asperiores, blanditiis?
								</p>
							</div>
						</a>
					</li>

					<li>
						<a href="#" className={styles.card}>
							<img
								src="https://i.imgur.com/2DhmtJ4.jpg"
								className={styles.card__image}
								alt=""
							/>
							<div className={styles.card__overlay}>
								<div className={styles.card__header}>
									<svg
										className={styles.card__arc}
										xmlns="http://www.w3.org/2000/svg"
									>
										<path />
									</svg>
									<img
										className={styles.card__thumb}
										src="https://i.imgur.com/sjLMNDM.png"
										alt=""
									/>
									<div className={styles.card__headerText}>
										<h3 className={styles.card__title}>Kim Cattrall</h3>
										<span className={styles.card__status}>3 hours ago</span>
									</div>
								</div>
								<p className={styles.card__description}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Asperiores, blanditiis?
								</p>
							</div>
						</a>
					</li>
				</ul>

				{/* <ul className={styles.cardContainer}> */}

				{/* <Card
						imageUrl="https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/hunter/loader/desktop/loader-2.jpg"
						thumbUrl="https://i.imgur.com/7D7I6dI.png"
						title="RE Hunter 350"
						status="1 hour ago"
						price="350/hour"
						showButton={true}
						onClick={() => alert("bought!")}
					/> */}
				{/* <Card
						imageUrl="https://images.unsplash.com/photo-1595691403533-7f4a52a5b189?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwZXJiaWtlfGVufDB8fDB8fHww"
						thumbUrl="https://i.imgur.com/7D7I6dI.png"
						title="RE Hunter 350"
						status="1 hour ago"
						price="350/hour"
						showButton={true}
						onClick={() => alert("bought!")}
					/> */}
				{/* <Card
						imageUrl="https://i.imgur.com/2DhmtJ4.jpg"
						thumbUrl="https://i.imgur.com/sjLMNDM.png"
						title="Kim Cattrall"
						status="3 hours ago"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?"
					/> */}
				{/* </ul> */}
			</div>
		</div>
	);
};

export default DashboardPage;
