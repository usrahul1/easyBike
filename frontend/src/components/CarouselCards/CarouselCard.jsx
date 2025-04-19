import React, { useEffect, useRef, useState } from "react";
import styles from "./CarouselCard.module.css"; // Importing the module
import Typed from "typed.js";

const CarouselCard = () => {
	const typedRef = useRef(null);
	useEffect(() => {
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

		return () => {
			typed.destroy();
		};
	}, []);

	return (
		<>
			<div className="h-screen bg-[#2F2F2F] flex flex-col gap-2">
				<h1 className={`text-white absolute ${styles.text}`}>
					<span className="select-none" ref={typedRef}></span>
				</h1>
				<div className={styles.container}>
					<div className={styles.carousel}>
						<div className={styles.carousel__face}>
							<span>This is something</span>
						</div>
						<div className={styles.carousel__face}>
							<span>Very special</span>
						</div>
						<div className={styles.carousel__face}>
							<span>Special is the key</span>
						</div>
						<div className={styles.carousel__face}>
							<span>For you</span>
						</div>
						<div className={styles.carousel__face}>
							<span>Just give it</span>
						</div>
						<div className={styles.carousel__face}>
							<span>A try</span>
						</div>
						<div className={styles.carousel__face}>
							<span>And see</span>
						</div>
						<div className={styles.carousel__face}>
							<span>How IT Works</span>
						</div>
						<div className={styles.carousel__face}>
							<span>Woow</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CarouselCard;
