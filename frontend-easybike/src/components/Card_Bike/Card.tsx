// import React from "react";
// import styles from "./Card.module.css";

// interface CardProps {
// 	imageUrl: string;
// 	thumbUrl: string;
// 	title: string;
// 	status: string;
// 	price: string | number;
// 	showButton?: boolean;
// 	onClick?: React.MouseEventHandler<HTMLButtonElement>;
// }

// const Card: React.FC<CardProps> = ({
// 	imageUrl,
// 	thumbUrl,
// 	title,
// 	status,
// 	price,
// 	showButton = true,
// 	onClick,
// }) => {
// 	return (
// 		<li className="text-gray-700 dark:text-gray-400">
// 			<a
// 				href="#"
// 				className={`${styles.card} border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400`}
// 			>
// 				<img src={imageUrl} className={styles.card__image} alt="" />
// 				<div className={styles.card__overlay}>
// 					<div className={styles.card__header}>
// 						<svg
// 							className={`${styles.card__arc} fill-white dark:fill-gray-800`}
// 							xmlns="http://www.w3.org/2000/svg"
// 						>
// 							<path />
// 						</svg>
// 						<img className={styles.card__thumb} src={thumbUrl} alt="thumb" />
// 						<div className={styles.card__headerText}>
// 							<h3 className={styles.card__title}>{title}</h3>
// 							<span className={styles.card__status}>{status}</span>
// 						</div>
// 					</div>
// 					<div className={styles.card__description}>
// 						<p className="text-gray-700 dark:text-gray-400">Price: {price}</p>
// 						{showButton && (
// 							<button
// 								className="bg-purple-600 text-white rounded px-4 py-1 mt-2 hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-900 cursor-pointer"
// 								onClick={onClick}
// 							>
// 								Order
// 							</button>
// 						)}
// 					</div>
// 				</div>
// 			</a>
// 		</li>
// 	);
// };

// export default Card;

import React from "react";
import styles from "./Card.module.css";

interface CardProps {
	imageUrl: string;
	thumbUrl: string;
	title: string;
	status: string;
	price: string | number;
	showButton?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Card: React.FC<CardProps> = ({
	imageUrl,
	thumbUrl,
	title,
	status,
	price,
	showButton = true,
	onClick,
}) => {
	return (
		<li className="text-base-content">
			<a
				href="#"
				className={`${styles.card} border border-base-300 bg-base-200 text-base-content`}
			>
				<img src={imageUrl} className={styles.card__image} alt="" />
				<div className={styles.card__overlay}>
					<div className={styles.card__header}>
						<svg
							className={`${styles.card__arc} fill-base-200`}
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
						<p>Price: {price}</p>
						{showButton && (
							<button className="btn btn-primary mt-2" onClick={onClick}>
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
