import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
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
import type { User, UserCredential } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

interface ProfDetails {
	uid: string;
	name: string | null;
	email: string | null;
	photoURL: string | null;
	createdAt: string;
}

export interface FirebaseContextType {
	createUser: (
		email: string,
		password: string,
		name: string
	) => Promise<User | undefined>;
	signIn: (email: string, password: string) => Promise<UserCredential | null>;
	isLoggedIn: boolean;
	googleSignIn: () => Promise<void>;
	logOut: () => Promise<void>;
	profDetails: () => ProfDetails | null;
	fileUpload: (
		file: File | null,
		path: string,
		bike?: boolean
	) => Promise<string | null>;

	// ✅ New method to get Firebase user ID token
	getUserIdToken: () => Promise<string | null>;
	getUserUID: () => string | null;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

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
const storage = getStorage(firebaseApp);

interface FirebaseProviderProps {
	children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
				console.log(currentUser);
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, []);

	const createUser = async (
		email: string,
		password: string,
		name: string
	): Promise<User | undefined> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);
			const newUser = userCredential.user;

			await updateProfile(newUser, {
				displayName: name,
				photoURL: null,
			});

			return newUser;
		} catch (error: any) {
			toast.error(`Error: ${error.message}`);
		}
	};

	const signIn = async (
		email: string,
		password: string
	): Promise<UserCredential | null> => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);
			toast.success("Logged in successfully!");
			return userCredential;
		} catch (error: any) {
			console.error("Login failed:", error.message);
			toast.error(`Login failed! ${error.message}`);
			return null;
		}
	};

	const googleSignIn = async (): Promise<void> => {
		try {
			await signInWithPopup(firebaseAuth, googleProvider);
		} catch (error: any) {
			toast.error(`Error: ${error.message}`);
		}
	};

	const isLoggedIn = Boolean(user);

	const logOut = async (): Promise<void> => {
		try {
			await signOut(firebaseAuth);
		} catch (error: any) {
			toast.error(`Error: ${error.message}`);
		}
	};

	const profDetails = (): ProfDetails | null => {
		try {
			if (user) {
				const rawDate = user.metadata.creationTime ?? "";
				const dateParts = rawDate.split(", ")[1]?.split(" ") || [];
				const dateOnly =
					dateParts.length >= 3
						? `${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`
						: rawDate;

				return {
					uid: user.uid, // ✅ Added this line
					name: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					createdAt: dateOnly,
				};
			}
			return null;
		} catch (error: any) {
			toast.error(`Error: ${error.message}`);
			return null;
		}
	};

	const fileUpload = async (
		file: File | null,
		path: string,
		bike: boolean = false
	): Promise<string | null> => {
		try {
			if (!file || !path) throw new Error("File or path missing");

			const storageRef = ref(
				storage,
				`${bike ? "bike" : "profile"}_requests/${path}/${Date.now()}_${
					file.name
				}`
			);

			const snapshot = await uploadBytes(storageRef, file);
			const downloadURL = await getDownloadURL(snapshot.ref);
			console.log(downloadURL);
			return downloadURL;
		} catch (error: any) {
			console.error("Upload failed:", error);
			toast.error(`Upload failed: ${error.message}`);
			return null;
		}
	};

	const getUserIdToken = async (): Promise<string | null> => {
		try {
			if (!user) return null;
			return await user.getIdToken();
		} catch (error: any) {
			toast.error(`Token error: ${error.message}`);
			return null;
		}
	};

	const getUserUID = (): string | null => {
		return user?.uid || null;
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
				fileUpload,
				getUserIdToken,
				getUserUID,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = (): FirebaseContextType => {
	const context = useContext(FirebaseContext);
	if (!context) {
		throw new Error("useFirebase must be used within a FirebaseProvider");
	}
	return context;
};
