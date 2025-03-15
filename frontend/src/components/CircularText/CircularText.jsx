import React from "react";
import styles from "./CircularText.module.css";
import gif from "../../assets/bike.gif"; // Adjust the path as needed

const CircularText = () => {
	return (
		<div className={styles.circularTextContainer}>
			<svg viewBox="0 0 200 200" className={styles.circularTextSvg}>
				<defs>
					<path
						id="circlePath"
						d="M 100, 100
               m -75, 0
               a 75,75 0 1,1 150,0
               a 75,75 0 1,1 -150,0"
					/>
				</defs>

				<text className={styles.circularText}>
					<textPath href="#circlePath" startOffset="0%">
						One Login. Endless roads to ride. Click on Me.
					</textPath>
				</text>
			</svg>

			{/* Button in the center */}
			<div className={styles.cBCont}>
				<button type="submit" className={styles.circularButton}>
					<img src={gif} alt="GIF" className={styles.circularImage} />
				</button>
			</div>
		</div>
	);
};

export default CircularText;
