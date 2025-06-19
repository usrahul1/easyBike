import React from "react";
import styles from "./CircularText.module.css";
import gif from "../../assets/bike.gif";
import { Link } from "react-router-dom";

const CircularText: React.FC = () => {
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
						&nbsp;&nbsp;&nbsp;One Login.&nbsp;&nbsp;&nbsp;Endless roads to
						ride.&nbsp;&nbsp;&nbsp;Click Me.
					</textPath>
				</text>
			</svg>

			{/* Button in the center */}
			<div className={styles.cBCont}>
				<Link to="/login" className={styles.circularButton}>
					<img src={gif} alt="GIF" className={styles.circularImage} />
				</Link>
			</div>
		</div>
	);
};

export default CircularText;
