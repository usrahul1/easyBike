import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import GoOnlineModal from "../Admin/components/modal/goOnlineModal";
import { makeBikeOffline } from "../../fetch/fetch";
import OrderBikeModal from "../Admin/components/modal/OrderBikeModal";

interface CardProps {
	imageUrl: string;
	backView?: string;
	leftView?: string;
	rightView?: string;
	thumbUrl: string;
	title: string;
	status: string;
	price: string | number;
	showButton?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	ownBike?: boolean;
	id: string;
	isOnline: boolean;
}

const Card: React.FC<CardProps> = ({
	imageUrl,
	backView,
	leftView,
	rightView,
	thumbUrl,
	title,
	status,
	price,
	showButton = true,
	ownBike = false,
	id,
	isOnline,
}) => {
	useEffect(() => {
		console.log("🛠️ Card component mounted with props:");
		console.log({
			id,
			title,
			imageUrl,
			backView,
			leftView,
			rightView,
			thumbUrl,
			status,
			price,
			isOnline,
			ownBike,
			showButton,
		});
	}, []);

	const images = [imageUrl, rightView, backView, leftView].filter(
		Boolean
	) as string[];
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		console.log("next");
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const handlePrev = () => {
		console.log("prev");
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const [showModal, setShowModal] = useState(false);
	const [selectedBikeId, setSelectedBikeId] = useState<string | null>(null);

	const handleGoOnlineClick = (bikeId: string) => {
		setSelectedBikeId(id);
		setShowModal(true);
		console.log(bikeId);
	};

	const [showOrderModal, setShowOrderModal] = useState(false);

	const handleOrderClick = async () => {
		setShowOrderModal(true);
	};

	return (
		<div className="text-base-content">
			{/* Changed <a> to <div> to avoid href="#" issues */}
			<div
				className={`${styles.card} border border-base-300 bg-base-200 text-base-content`}
			>
				{/* Image with navigation */}
				<div className="relative">
					<img
						src={images[currentIndex]}
						className={styles.card__image}
						alt={`Bike view ${currentIndex + 1}`}
					/>

					{/* Prev/Next buttons */}
					{images.length > 1 && (
						<>
							<button
								className="absolute top-1/4 left-2 transform -translate-y-1/2 bg-base-100 bg-opacity-80 px-2 py-1 rounded-full"
								onClick={(e) => {
									e.stopPropagation();
									handlePrev();
								}}
							>
								◀
							</button>
							<button
								className="absolute top-1/4 right-2 transform -translate-y-1/2 bg-base-100 bg-opacity-80 px-2 py-1 rounded-full"
								onClick={(e) => {
									e.stopPropagation();
									handleNext();
								}}
							>
								▶
							</button>
						</>
					)}
				</div>

				{/* Card Overlay */}
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

						{/* Show "Order" button only for non-owner */}
						{showButton && !ownBike && (
							<button
								className="btn btn-accent mt-2"
								onClick={() => handleOrderClick()}
							>
								Order Bike
							</button>
						)}

						{/* Show "Go Online" button only for owner */}
						{ownBike && (
							<>
								{isOnline ? (
									<button
										className="btn btn-error mt-2"
										onClick={async () => {
											try {
												await makeBikeOffline(id);
												alert("Bike is now offline");
												window.location.reload();
											} catch (error) {
												alert("Failed to go offline.");
											}
										}}
									>
										Go Offline
									</button>
								) : (
									<button
										className="btn btn-accent mt-2"
										onClick={() => handleGoOnlineClick(id)}
									>
										Go Online
									</button>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			{showModal && selectedBikeId && (
				<GoOnlineModal
					bikeId={selectedBikeId}
					onClose={() => setShowModal(false)}
					// onSuccess={handleSuccess}
				/>
			)}

			{showOrderModal && (
				<OrderBikeModal
					bikeId={id}
					onClose={() => setShowOrderModal(false)}
					// optionally pass onSuccess to refresh UI or show success message
				/>
			)}
		</div>
	);
};

export default Card;
