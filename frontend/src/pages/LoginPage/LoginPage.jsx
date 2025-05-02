import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const container = document.getElementById("container");
		if (isActive) {
			container.classList.add(styles.containerActive);
		} else {
			container.classList.remove(styles.containerActive);
		}
	}, [isActive]);

	return (
		<div className={styles.loginWrapper}>
			<div className={styles.container} id="container">
				<div className={`${styles.formContainer} ${styles.signUp}`}>
					<form className={styles.form}>
						<h1
							className={`text-xl font-bold cursor-pointer select-none ${styles.underline}`}
						>
							Create Account
						</h1>
						<div className={styles.socialIcons}>
							<a href="#" className={styles.icon}>
								<i className="fa-brands fa-google-plus-g"></i>
							</a>
							{/* <a href="#" className={styles.icon}>
									<i className="fa-brands fa-facebook-f"></i>
								</a>
								<a href="#" className={styles.icon}>
									<i className="fa-brands fa-github"></i>
								</a>
								<a href="#" className={styles.icon}>
									<i className="fa-brands fa-linkedin-in"></i>
								</a> */}
						</div>
						<span className={styles.subText}>
							or use your email for registration
						</span>
						<input className={styles.input} type="text" placeholder="Name" />
						<input className={styles.input} type="email" placeholder="Email" />
						<input
							className={styles.input}
							type="password"
							placeholder="Password"
						/>
						<button type="button" className={`${styles.button} text-white`}>
							Sign Up
						</button>
					</form>
				</div>

				<div className={`${styles.formContainer} ${styles.signIn}`}>
					<form className={styles.form}>
						<h1
							className={`text-xl font-bold cursor-pointer select-none ${styles.underline}`}
						>
							Sign In
						</h1>
						<div className={styles.socialIcons}>
							<a href="#" className={styles.icon}>
								<i className="fa-brands fa-google-plus-g"></i>
							</a>
							{/* <a href="#" className={styles.icon}>
								<i className="fa-brands fa-facebook-f"></i>
							</a>
							<a href="#" className={styles.icon}>
								<i className="fa-brands fa-github"></i>
							</a>
							<a href="#" className={styles.icon}>
								<i className="fa-brands fa-linkedin-in"></i>
							</a> */}
						</div>
						<span className={styles.subText}>or use your email password</span>
						<input className={styles.input} type="email" placeholder="Email" />
						<input
							className={styles.input}
							type="password"
							placeholder="Password"
						/>
						<a href="#" className={styles.link}>
							Forget Your Password?
						</a>
						<button type="button" className={`${styles.button} text-white`}>
							Sign In
						</button>
					</form>
				</div>

				<div className={styles.toggleContainer}>
					<div className={styles.toggle}>
						<div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
							<h1>Welcome Back!</h1>
							<p className={styles.text}>
								Enter your personal details to use all of site features
							</p>
							<button
								className={`${styles.button} ${styles.hidden} text-black`}
								onClick={() => setIsActive(false)}
							>
								Sign In
							</button>
						</div>
						<div className={`${styles.togglePanel} ${styles.toggleRight}`}>
							<h1>Hello, Friend!</h1>
							<p className={styles.text}>
								Register with your personal details to use all of site features
							</p>
							<button
								className={`${styles.button} ${styles.hidden} text-black`}
								onClick={() => setIsActive(true)}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
