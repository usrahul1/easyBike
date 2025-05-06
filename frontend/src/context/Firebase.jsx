import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

const FirebaseContext = createContext(null);

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				setUser(user);
				console.log(user);
				profDetails();
			} else setUser(null);
		});
	}, []);

	const createUser = async (email, password, name) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);
			const user = userCredential.user;

			await updateProfile(user, {
				displayName: name,
				photoURL: null,
			});

			return user;
		} catch (error) {
			toast.error(`Error: ${error.message}`);
		}
	};

	const signIn = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);
			toast.success("Logged in successfully!");
			return userCredential;
		} catch (error) {
			console.error("Login failed:", error.message);
			toast.error(`Login failed! ${error.message}`);
			return null;
		}
	};

	const googleSignIn = async () => {
		try {
			await signInWithPopup(firebaseAuth, googleProvider);
		} catch (error) {
			toast.error(`Error: ${error.message}`);
		}
	};

	const isLoggedIn = user ? true : false;

	const logOut = async () => {
		try {
			await signOut(firebaseAuth);
		} catch (error) {
			toast.error(`Error: ${error.message}`);
		}
	};

	const profDetails = () => {
		try {
			if (user) {
				const rawDate = user.metadata.creationTime;
				const dateOnly =
					rawDate.split(", ")[1].split(" ")[0] +
					" " +
					rawDate.split(", ")[1].split(" ")[1] +
					" " +
					rawDate.split(", ")[1].split(" ")[2];
				return {
					name: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					createdAt: dateOnly,
				};
			}
			return null;
		} catch (error) {
			toast.error(`Error: ${error.message}`);
			return null;
		}
	};

	return (
		<FirebaseContext.Provider
			value={{
				createUser,
				signIn,
				isLoggedIn,
				googleSignIn,
				logOut,
				profDetails,
			}}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = () => useContext(FirebaseContext);
