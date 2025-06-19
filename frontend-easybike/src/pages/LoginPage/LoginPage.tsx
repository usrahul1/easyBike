import React, { useEffect, useState } from "react";
import type { FormEvent } from "react";
import styles from "./LoginPage.module.css";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const LoginPage: React.FC = () => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [pass, setPass] = useState<string>("");
	const [name, setName] = useState<string>("");

	const firebase = useFirebase();
	const navigate = useNavigate();

	useEffect(() => {
		const container = document.getElementById("container");
		if (!container) return;

		if (isActive) {
			container.classList.add(styles.containerActive);
		} else {
			container.classList.remove(styles.containerActive);
		}
	}, [isActive]);

	useEffect(() => {
		if (firebase.isLoggedIn) {
			toast.success("Hehe welcome! ^_^");
			navigate("/user/dashboard");
		}
	}, [firebase.isLoggedIn, navigate]);

	const handleLogin = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const res = await firebase.signIn(email, pass);
		console.log(res);
	};

	const handleSignUp = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const res = await firebase.createUser(email, pass, name);
		if (res == null) {
			toast.error("Login failed! Try again >_<");
		}
		toast.success("Successfully signed up!");
		navigate("/user/dashboard");
	};

	const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
							className={`text-xl font-bold cursor-pointer select-none text-black ${styles.underline}`}
						>
							Join us!
						</h1>
						<div className={styles.socialIcons}>
							<button
								type="button"
								onClick={handleGoogleSignIn}
								className={`${styles.icon} cursor-pointer`}
							>
								<FaGoogle className="text-black" />
							</button>
						</div>
						<span className={`${styles.subText} text-black`}>
							or use your email for registration
						</span>
						<input
							onChange={(e) => setName(e.target.value)}
							value={name}
							className={`${styles.input} text-black`}
							type="text"
							placeholder="Name"
							required
						/>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className={`${styles.input} text-black`}
							type="email"
							placeholder="Email"
							required
						/>
						<input
							onChange={(e) => setPass(e.target.value)}
							value={pass}
							className={`${styles.input} text-black`}
							type="password"
							placeholder="Password"
							required
						/>
						<button
							onClick={handleSignUp}
							type="submit"
							className={`${styles.button} text-black`}
						>
							Sign Up
						</button>
					</form>
				</div>

				<div className={`${styles.formContainer} ${styles.signIn}`}>
					<form className={styles.form}>
						<h1
							className={`text-xl font-bold text-black cursor-pointer select-none ${styles.underline}`}
						>
							Welcome Back!
						</h1>
						<div className={styles.socialIcons}>
							<button
								type="button"
								onClick={handleGoogleSignIn}
								className={`${styles.icon} cursor-pointer text-black`}
							>
								<FaGoogle className="text-black" />
							</button>
						</div>
						<span className={`${styles.subText} text-black`}>
							or use your email password
						</span>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className={`${styles.input} text-black`}
							type="email"
							placeholder="Email"
							required
						/>
						<input
							onChange={(e) => setPass(e.target.value)}
							value={pass}
							className={`${styles.input} text-black`}
							type="password"
							placeholder="Password"
							required
						/>
						<button
							onClick={handleLogin}
							type="submit"
							className={`${styles.button} text-black`}
						>
							Sign In
						</button>
					</form>
				</div>

				<div className={styles.toggleContainer}>
					<div className={styles.toggle}>
						<div
							className={`${styles.togglePanel} ${styles.toggleLeft} text-black`}
						>
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
						<div
							className={`${styles.togglePanel} ${styles.toggleRight} text-black`}
						>
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
