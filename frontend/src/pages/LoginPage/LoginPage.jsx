import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
	const [isActive, setIsActive] = useState(false);
	const firebase = useFirebase();
	const navigate = useNavigate();

	useEffect(() => {
		const container = document.getElementById("container");
		if (isActive) {
			container.classList.add(styles.containerActive);
		} else {
			container.classList.remove(styles.containerActive);
		}
	}, [isActive]);

	useEffect(() => {
		if (firebase.isLoggedIn) {
			toast.success("Hehe welcome! ^_^");
			navigate("/dashboard");
		}
	}, [firebase, navigate]);

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [name, setName] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		const res = await firebase.signIn(email, pass);
		console.log(res);
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		const res = await firebase.createUser(email, pass, name);
		if (res == null) {
			toast.error("Login failed! Try again >_<");
		}
	};

	const handleGoogleSignIn = async (e) => {
		e.preventDefault();
		const res = await firebase.googleSignIn();
		console.log(res);
	};

	return (
		<div className={styles.loginWrapper}>
			<div className={styles.container} id="container">
				<div className={`${styles.formContainer} ${styles.signUp}`}>
					<form className={styles.form}>
						<h1
							className={`text-xl font-bold cursor-pointer select-none ${styles.underline}`}
						>
							Join us!
						</h1>
						<div className={styles.socialIcons}>
							<button
								type="button"
								onClick={handleGoogleSignIn}
								className={`${styles.icon} cursor-pointer`}
							>
								<i className="fa-brands fa-google"></i>
							</button>
						</div>
						<span className={styles.subText}>
							or use your email for registration
						</span>
						<input
							onChange={(e) => setName(e.target.value)}
							value={name}
							className={styles.input}
							type="text"
							placeholder="Name"
							required
						/>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className={styles.input}
							type="email"
							placeholder="Email"
							required
						/>
						<input
							onChange={(e) => setPass(e.target.value)}
							value={pass}
							className={styles.input}
							type="password"
							placeholder="Password"
							required
						/>
						<button
							onClick={handleSignUp}
							type="submit"
							className={`${styles.button} text-white`}
						>
							Sign Up
						</button>
					</form>
				</div>

				<div className={`${styles.formContainer} ${styles.signIn}`}>
					<form className={styles.form}>
						<h1
							className={`text-xl font-bold cursor-pointer select-none ${styles.underline}`}
						>
							Welcome Back!
						</h1>
						<div className={styles.socialIcons}>
							<button
								type="button"
								onClick={handleGoogleSignIn}
								className={`${styles.icon} cursor-pointer`}
							>
								<i className="fa-brands fa-google"></i>
							</button>
						</div>
						<span className={styles.subText}>or use your email password</span>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className={styles.input}
							type="email"
							placeholder="Email"
							required
						/>
						<input
							onChange={(e) => setPass(e.target.value)}
							value={pass}
							className={styles.input}
							type="password"
							placeholder="Password"
							required
						/>
						<button
							onClick={handleLogin}
							type="submit"
							className={`${styles.button} text-white`}
						>
							Sign In
						</button>
					</form>
				</div>

				<div className={styles.toggleContainer}>
					<div className={styles.toggle}>
						<div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
							<h1>Hehe first time?</h1>
							<p className={styles.text}>
								We won't make sure it's your last time! Register rn!
							</p>
							<button
								className={`${styles.button} ${styles.hidden} text-black`}
								onClick={() => setIsActive(false)}
							>
								Sign In
							</button>
						</div>
						<div className={`${styles.togglePanel} ${styles.toggleRight}`}>
							<h1>Hola, Rider!</h1>
							<p className={styles.text}>Welcome back, sign in and enjoy!</p>
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
