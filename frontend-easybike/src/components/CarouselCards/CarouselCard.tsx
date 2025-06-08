import React, { useEffect, useRef } from "react";
import styles from "./CarouselCard.module.css"; // Importing the module
import Typed from "typed.js";

const CarouselCard: React.FC = () => {
	const typedRef = useRef<HTMLSpanElement | null>(null);
	const carouselRef = useRef<HTMLDivElement | null>(null);
	const selectedIndex = useRef(0);
	const cellCount = 9;

	useEffect(() => {
		// Typed.js text animation
		if (typedRef.current) {
			const typed = new Typed(typedRef.current, {
				strings: [
					"What's this about?",
					"How does it work?",
					"How can I use?",
					"Is it accessible to everyone?",
				],
				typeSpeed: 75,
				backSpeed: 75,
				loop: true,
			});

			return () => typed.destroy();
		}
	}, []);

	const rotateCarousel = () => {
		if (!carouselRef.current) return;
		const angle = (selectedIndex.current / cellCount) * -360;
		carouselRef.current.style.transform = `translateZ(-288px) rotateY(${angle}deg)`;
	};

	useEffect(() => {
		const prevButton = document.querySelector(".previous-button");
		const nextButton = document.querySelector(".next-button");

		const handlePrev = () => {
			selectedIndex.current--;
			rotateCarousel();
		};
		const handleNext = () => {
			selectedIndex.current++;
			rotateCarousel();
		};

		prevButton?.addEventListener("click", handlePrev);
		nextButton?.addEventListener("click", handleNext);

		return () => {
			prevButton?.removeEventListener("click", handlePrev);
			nextButton?.removeEventListener("click", handleNext);
		};
	}, []);

	return (
		// <div className="h-screen bg-[#2F2F2F] flex flex-col gap-2">
		// 	<h1 className={`text-white absolute ${styles.text}`}>
		// 		<span className="select-none" ref={typedRef}></span>
		// 	</h1>
		// 	<div className={styles.container}>
		// 		<div className={styles.carousel}>
		// 			<div className={styles.carousel__face}>
		// 				<span>This is something</span>
		// 			</div>
		// 			<div className={styles.carousel__face}>
		// 				<span>Very special</span>
		// 			</div>
		// 			<div className={styles.carousel__face}>
		// 				<span>Special is the key</span>
		// 			</div>
		// 			<div className={styles.carousel__face}>
		// 				<span>For you</span>
		// 			</div>
		// 			<div className={styles.carousel__face}>
		// 				<span>Just give it</span>
		// 			</div>
		// 			<div className={styles.carousel__face}>
		// 				<span>A try</span>
		// 			</div>
		// 			<div className={styles.carousel__face}>
		// 				<span>And see</span>
		// 			</div>
		// 			<div className={styles.carousel__face}>
		// 				<span>How IT Works</span>
		// 			</div>
		// 			<div className={styles.carousel__face}>
		// 				<span>Woow</span>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<div className="h-screen bg-[#2F2F2F] flex flex-col gap-2">
			<h1
				className={`text-white absolute ${styles.text} text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`}
			>
				<span className="select-none" ref={typedRef}></span>
			</h1>

			<div className={styles.scene}>
				<div className={styles.carousel} ref={carouselRef}>
					<div className={styles.carousel__cell}>1</div>
					<div className={styles.carousel__cell}>2</div>
					<div className={styles.carousel__cell}>3</div>
					<div className={styles.carousel__cell}>4</div>
					<div className={styles.carousel__cell}>5</div>
					<div className={styles.carousel__cell}>6</div>
					<div className={styles.carousel__cell}>7</div>
					<div className={styles.carousel__cell}>8</div>
					<div className={styles.carousel__cell}>9</div>
				</div>
			</div>
			<div className="flex gap-4 mt-4">
				<button className="previous-button bg-white text-black px-4 py-2 rounded">
					Prev
				</button>
				<button className="next-button bg-white text-black px-4 py-2 rounded">
					Next
				</button>
			</div>
		</div>
	);
};

export default CarouselCard;
