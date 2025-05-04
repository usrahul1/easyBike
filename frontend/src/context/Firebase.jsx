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
} from "firebase/auth";

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
			} else setUser(null);
		});
	}, []);

	const createUser = (email, password, name) => {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const googleSignIn = async () =>
		await signInWithPopup(firebaseAuth, googleProvider);

	const isLoggedIn = user ? true : false;

	const logOut = async () => await signOut(firebaseAuth);

	return (
		<FirebaseContext.Provider
			value={{ createUser, signIn, isLoggedIn, googleSignIn, logOut }}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = () => useContext(FirebaseContext);
