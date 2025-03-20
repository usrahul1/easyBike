import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { House } from "lucide-react";

const LoginPage = () => {
	return (
		<>
			<div className={`${styles.container}`}>
				<div className="text-white ">
					<Link to="/">
						<h2
							className={`flex absolute text-xl left-8 top-7 items-center gap-2 border-2 border-white px-2 py-2 pt-1 pb-1 rounded-lg cursor-pointer ${styles.home}`}
						>
							<House /> Home
						</h2>
					</Link>
				</div>
				<div className={styles.background}>
					<div className={`${styles.shape} ${styles.shapeFirst}`}></div>
					<div className={`${styles.shape} ${styles.shapeLast}`}></div>
				</div>
				<form className={styles.form}>
					<h3 className={styles.heading}>Login Here</h3>

					<label className={styles.label} htmlFor="username">
						Username
					</label>
					<input
						className={styles.input}
						type="text"
						placeholder="Email or Phone"
						id="username"
					/>

					<label className={styles.label} htmlFor="password">
						Password
					</label>
					<input
						className={styles.input}
						type="password"
						placeholder="Password"
						id="password"
					/>

					<button className={styles.button} type="submit">
						Log In
					</button>

					<div className={styles.social}>
						<div className={styles.google}>
							<i className={`fab fa-google ${styles.icon}`}></i>Google
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default LoginPage;
