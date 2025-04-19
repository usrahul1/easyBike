import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { House } from "lucide-react";
import Footer from "../../components/Footer/Footer";

const LoginPage = () => {
	const firstRef = useRef(null);
	const [inputType, setInputType] = useState("pass");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const toggleInputType = (e) => {
		e.preventDefault();
		setInputType((prev) => (prev === "pass" ? "text" : "pass"));
	};

	return (
		<>
			<div className={`${styles.container}`} ref={firstRef}>
				<div className="text-white">
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
					<h3 className={`${styles.heading} select-none`}>Login Here</h3>
					<h4 className="text-white select-none text-xl">
						Didn't sign up yet? <a className={styles.register}>Register Now!</a>
					</h4>

					<label className={styles.label} htmlFor="username">
						Email
					</label>
					<input
						className={styles.input}
						type="email"
						placeholder="Email"
						id="email"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					<label className={styles.label} htmlFor="password">
						Password
						<button onClick={toggleInputType} className="ml-2 text-white">
							{inputType === "pass" ? (
								<i className="fa-solid fa-eye-slash"></i>
							) : (
								<i className="fa-solid fa-eye"></i>
							)}
						</button>
					</label>
					<input
						className={styles.input}
						type={inputType === "pass" ? "password" : "text"}
						placeholder="Password"
						id="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button className={styles.button} type="submit">
						Log In
					</button>

					<div className={styles.social}>
						<div className={styles.google}>
							<i className={`fab fa-google ${styles.icon}`}></i>Google
						</div>
						<div className={styles.google}>
							<i className={`fa-brands fa-facebook ${styles.icon}`}></i>Facebook
						</div>
					</div>
				</form>
			</div>
			<Footer firstScreenRef={firstRef} />
		</>
	);
};

export default LoginPage;
