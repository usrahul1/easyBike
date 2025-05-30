// import React from "react";
// import styles from "./Card.module.css";

// const Card = ({
// 	imageUrl,
// 	thumbUrl,
// 	title,
// 	status,
// 	price,
// 	showButton,
// 	onClick,
// }) => {
// 	return (
// 		<li className=" text-gray-700 dark:text-gray-400">
// 			<a
// 				href="#"
// 				className={`${styles.card} border-gray-200 dark:border-gray-800 `}
// 			>
// 				<img src={imageUrl} className={styles.card__image} alt="" />
// 				<div className={styles.card__overlay}>
// 					<div className={styles.card__header}>
// 						<svg
// 							className={`${styles.card__arc}`}
// 							xmlns="http://www.w3.org/2000/svg"
// 						>
// 							<path />
// 						</svg>
// 						<img className={styles.card__thumb} src={thumbUrl} alt="thumb" />
// 						<div
// 							className={`${styles.card__headerText} text-gray-700 dark:text-gray-400`}
// 						>
// 							<h3
// 								className={`${styles.card__title} text-gray-700 dark:text-gray-400`}
// 							>
// 								{title}
// 							</h3>
// 							<span
// 								className={`${styles.card__status} text-gray-700 dark:text-gray-400`}
// 							>
// 								{status}
// 							</span>
// 						</div>
// 					</div>
// 					<div className={`${styles.card__description}`}>
// 						<p
// 							className={`${styles.card__price} text-gray-700 dark:text-gray-400`}
// 						>
// 							Price: {price}
// 						</p>
// 						<button
// 							className={`${styles.card__button} cursor-pointer text-gray-700 dark:text-gray-400 hover:text-black`}
// 							onClick={onClick}
// 						>
// 							Order
// 						</button>
// 					</div>
// 				</div>
// 			</a>
// 		</li>
// 	);
// };

// export default Card;

// <ul className={styles.cardContainer}>
// 	<li>
// 		<a href="#" className={styles.card}>
// 			<img
// 				src="https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/hunter/loader/desktop/loader-2.jpg"
// 				className={styles.card__image}
// 				alt=""
// 			/>
// 			<div className={styles.card__overlay}>
// 				<div className={styles.card__header}>
// 					<svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg">
// 						<path />
// 					</svg>
// 					<img
// 						className={styles.card__thumb}
// 						src="https://i.imgur.com/7D7I6dI.png"
// 						alt=""
// 					/>
// 					<div className={styles.card__headerText}>
// 						<h3 className={styles.card__title}>RE Hunter 350</h3>
// 						<span className={styles.card__status}>1 hour ago</span>
// 					</div>
// 				</div>
// 				{/* <p className={styles.card__description}>
// 									Lorem ipsum dolor sit amet consectetur adipisicing elit.
// 									Asperiores, blanditiis?
// 								</p> */}
// 				<div className={styles.card__description}>
// 					<p className="text-lg text-black">Price: 350/hour</p>
// 					<button className="m-auto" onClick={() => alert("bought!")}>
// 						Order
// 					</button>
// 				</div>
// 			</div>
// 		</a>
// 	</li>

// 	<li>
// 		<a href="#" className={styles.card}>
// 			<img
// 				src="https://i.imgur.com/2DhmtJ4.jpg"
// 				className={styles.card__image}
// 				alt=""
// 			/>
// 			<div className={styles.card__overlay}>
// 				<div className={styles.card__header}>
// 					<svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg">
// 						<path />
// 					</svg>
// 					<img
// 						className={styles.card__thumb}
// 						src="https://i.imgur.com/sjLMNDM.png"
// 						alt=""
// 					/>
// 					<div className={styles.card__headerText}>
// 						<h3 className={styles.card__title}>Kim Cattrall</h3>
// 						<span className={styles.card__status}>3 hours ago</span>
// 					</div>
// 				</div>
// 				<p className={styles.card__description}>
// 					Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
// 					blanditiis?
// 				</p>
// 			</div>
// 		</a>
// 	</li>

// 	<li>
// 		<a href="#" className={styles.card}>
// 			<img
// 				src="https://i.imgur.com/oYiTqum.jpg"
// 				className={styles.card__image}
// 				alt=""
// 			/>
// 			<div className={styles.card__overlay}>
// 				<div className={styles.card__header}>
// 					<svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg">
// 						<path />
// 					</svg>
// 					<img
// 						className={styles.card__thumb}
// 						src="https://i.imgur.com/7D7I6dI.png"
// 						alt=""
// 					/>
// 					<div className={styles.card__headerText}>
// 						<h3 className={styles.card__title}>Jessica Parker</h3>
// 						<span className={styles.card__tagline}>
// 							Lorem ipsum dolor sit amet consectetur
// 						</span>
// 						<span className={styles.card__status}>1 hour ago</span>
// 					</div>
// 				</div>
// 				<p className={styles.card__description}>
// 					Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
// 					blanditiis?
// 				</p>
// 			</div>
// 		</a>
// 	</li>

// 	<li>
// 		<a href="#" className={styles.card}>
// 			<img
// 				src="https://i.imgur.com/2DhmtJ4.jpg"
// 				className={styles.card__image}
// 				alt=""
// 			/>
// 			<div className={styles.card__overlay}>
// 				<div className={styles.card__header}>
// 					<svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg">
// 						<path />
// 					</svg>
// 					<img
// 						className={styles.card__thumb}
// 						src="https://i.imgur.com/sjLMNDM.png"
// 						alt=""
// 					/>
// 					<div className={styles.card__headerText}>
// 						<h3 className={styles.card__title}>Kim Cattrall</h3>
// 						<span className={styles.card__status}>3 hours ago</span>
// 					</div>
// 				</div>
// 				<p className={styles.card__description}>
// 					Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
// 					blanditiis?
// 				</p>
// 			</div>
// 		</a>
// 	</li>
// </ul>;

import React from "react";
import styles from "./Card.module.css";

const Card = ({
	imageUrl,
	thumbUrl,
	title,
	status,
	price,
	showButton = true,
	onClick,
}) => {
	return (
		<li className="text-gray-700 dark:text-gray-400">
			<a
				href="#"
				className={`${styles.card} border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400`}
			>
				<img src={imageUrl} className={styles.card__image} alt="" />
				<div className={styles.card__overlay}>
					<div className={styles.card__header}>
						<svg
							className={`${styles.card__arc} fill-white dark:fill-gray-800`}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path />
						</svg>
						<img className={styles.card__thumb} src={thumbUrl} alt="thumb" />
						<div className={styles.card__headerText}>
							<h3 className={styles.card__title}>{title}</h3>
							<span className={styles.card__status}>{status}</span>
						</div>
					</div>
					<div className={styles.card__description}>
						<p className="text-gray-700 dark:text-gray-400">Price: {price}</p>
						{showButton && (
							<button
								className="bg-purple-600 text-white rounded px-4 py-1 mt-2 hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-900 cursor-pointer"
								onClick={onClick}
							>
								Order
							</button>
						)}
					</div>
				</div>
			</a>
		</li>
	);
};

export default Card;
