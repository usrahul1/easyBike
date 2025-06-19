import React, { useEffect, useRef } from "react";
import styles from "./CarouselCard.module.css"; // Importing the module
import Typed from "typed.js";

const CarouselCard: React.FC = () => {
	const typedRef = useRef<HTMLSpanElement | null>(null);
	const carouselRef = useRef<HTMLDivElement | null>(null);
	const selectedIndex = useRef(0);
	const cellCount = 4;

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

		const containerWidth = carouselRef.current.offsetWidth;
		const radius = containerWidth / (2 * Math.tan(Math.PI / cellCount)); // Dynamic Z
		const angle = (selectedIndex.current / cellCount) * -360;

		carouselRef.current.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
	};

	useEffect(() => {
		const prevButton = document.querySelector(".previous-button");
		const nextButton = document.querySelector(".next-button");

		const handlePrev = () => {
			selectedIndex.current =
				(selectedIndex.current - 1 + cellCount) % cellCount;
			rotateCarousel();
		};

		const handleNext = () => {
			selectedIndex.current = (selectedIndex.current + 1) % cellCount;
			rotateCarousel();
		};

		prevButton?.addEventListener("click", handlePrev);
		nextButton?.addEventListener("click", handleNext);

		// Auto-rotation every 1 second
		const intervalId = setInterval(() => {
			handleNext();
		}, 3000);

		// Cleanup
		return () => {
			prevButton?.removeEventListener("click", handlePrev);
			nextButton?.removeEventListener("click", handleNext);
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="h-fit bg-[#2F2F2F] flex flex-col gap-2">
			<h1
				className={`text-white mt-10 text-center ${styles.text} text-lg sm:text-xl md:text-2xl lg:text-3xl`}
			>
				<span className="select-none" ref={typedRef}></span>
			</h1>

			<div className={styles.scene}>
				<div className={styles.carousel} ref={carouselRef}>
					<div className={styles.carousel__cell}>
						<p>
							<strong className="text-black">What's this about?</strong>
							<br />
							EasyBike is a student-powered platform that allows you to rent or
							share bikes across campus efficiently and securely.
						</p>
					</div>
					<div className={styles.carousel__cell}>
						<p>
							<strong className="text-black">How does it work?</strong>
							<br />
							Bike owners list their vehicles, and renters nearby can request
							them. Everything from discovery to payment is handled in-app.
						</p>
					</div>
					<div className={styles.carousel__cell}>
						<p>
							<strong className="text-black">How can I use?</strong>
							<br />
							Just sign up, enable location, browse available bikes, and send a
							request. Owners will respond in real-time.
						</p>
					</div>
					<div className={styles.carousel__cell}>
						<p>
							<strong className="text-black">
								Is it accessible to everyone?
							</strong>
							<br />
							Currently, it’s limited to GITAM students for security and
							verification purposes. Expansion is in progress!
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-4 mt-6">
				<button className="previous-button btn btn-sm sm:btn-md btn-outline text-white">
					Prev
				</button>
				<button className="next-button btn btn-sm sm:btn-md btn-outline text-white">
					Next
				</button>
			</div>
		</div>
	);
};

export default CarouselCard;
