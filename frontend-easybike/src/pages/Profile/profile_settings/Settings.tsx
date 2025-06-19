import React, { useState, useRef, useEffect } from "react";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import { User, Camera, Mail, Phone } from "lucide-react";
import avatar from "../../../assets/avatar.png";
import { useThemeStore } from "../../../store/useThemeStore";
import { THEMES } from "../../../themes";

interface UserProfile {
	name: string | null;
	email: string | null;
	photoURL: string | null;
	createdAt: string | null;
}

const Settings: React.FC = () => {
	const firstScreenRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();
	const firebase = useFirebase();
	const { theme, setTheme } = useThemeStore();

	const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [profilePic, setProfilePic] = useState<string>(avatar);

	const handleImageUpload = () => {
		setIsUpdatingProfile(true);
	};

	useEffect(() => {
		const details = firebase.profDetails();
		if (details) {
			setProfile(details);
			if (details.photoURL != null) {
				setProfilePic(details.photoURL);
			}
		}
	}, [firebase]);

	useEffect(() => {
		if (!firebase.isLoggedIn) {
			navigate("/login");
		}
	}, [firebase.isLoggedIn, navigate]);

	return (
		<div className="flex flex-grow">
			<div className={`min-h-screen flex-1`} ref={firstScreenRef}>
				<div className="min-h-screen">
					<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<div className="bg-base-300 rounded-xl p-4 sm:p-6 space-y-8">
							{/* Header */}
							<div className="text-center">
								<h1 className="text-2xl font-semibold text-base-content">
									Profile
								</h1>
								<p className="mt-2 text-sm text-base-content/70">
									Your profile information
								</p>
							</div>

							{/* Avatar Section */}
							<div className="flex flex-col items-center gap-4">
								<div className="relative">
									<img
										src={profilePic}
										alt="Profile"
										className="size-28 sm:size-32 rounded-full object-cover border-4 border-base-100"
									/>
									<label
										htmlFor="avatar-upload"
										className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
					${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
				`}
									>
										<Camera className="w-5 h-5 text-base-200" />
										<input
											type="file"
											id="avatar-upload"
											className="hidden"
											accept="image/*"
											disabled={isUpdatingProfile}
											onChange={handleImageUpload}
										/>
									</label>
								</div>
								<p className="text-sm text-zinc-400 text-center px-2">
									{isUpdatingProfile
										? "Uploading..."
										: "Click the camera icon to update your photo"}
								</p>
							</div>

							{/* Name and Email */}
							<div className="space-y-6">
								<div className="space-y-1.5">
									<div className="text-sm text-zinc-400 flex items-center gap-2">
										<User className="w-4 h-4" />
										Full Name
									</div>
									<p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-100 text-base-content">
										{profile?.name || "Loading..."}
									</p>
								</div>

								<div className="space-y-1.5">
									<div className="text-sm text-zinc-400 flex items-center gap-2">
										<Mail className="w-4 h-4" />
										Email Address
									</div>
									<p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-100 text-base-content break-all">
										{profile?.email || "Loading..."}
									</p>
								</div>

								<div className="space-y-1.5">
									<div className="text-sm text-zinc-400 flex items-center gap-2">
										<Phone className="w-4 h-4" />
										Phone Number
									</div>
									<p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-100 text-base-content break-all">
										{"Not Provided"}
									</p>
								</div>
							</div>

							{/* Account Info */}
							<div className="bg-base-300 rounded-xl p-4 sm:p-6">
								<h2 className="text-lg font-medium mb-4 text-base-content">
									Account Information
								</h2>
								<div className="space-y-3 text-sm">
									<div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-base-100">
										<span className="text-base-content/70">Member Since</span>
										<span className="text-base-content">
											{profile?.createdAt || "Loading..."}
										</span>
									</div>
									<div className="flex flex-col sm:flex-row sm:justify-between py-2 ">
										<span className="text-base-content/70">Account Status</span>
										<span className="text-green-500">Active</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="p-4">
						<h2 className="font-semibold mb-4 text-base-content">
							<center className="select-none text-2xl">Select Theme</center>
						</h2>
						<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
							{THEMES.map((t) => (
								<button
									key={t}
									className={`group flex flex-col items-center p-2 rounded-lg transition duration-200 border
							${
								theme === t
									? "bg-base-200 border-primary"
									: "hover:bg-base-200 border-base-300"
							}
						`}
									onClick={() => setTheme(t)}
								>
									<div
										className="relative h-8 w-full rounded-md overflow-hidden"
										data-theme={t}
									>
										<div className="absolute inset-0 grid grid-cols-4 gap-0.5 p-1">
											<div className="rounded bg-primary h-full"></div>
											<div className="rounded bg-secondary h-full"></div>
											<div className="rounded bg-accent h-full"></div>
											<div className="rounded bg-neutral h-full"></div>
										</div>
									</div>
									<span className="text-xs mt-1 text-center truncate w-full text-base-content">
										{t.charAt(0).toUpperCase() + t.slice(1)}
									</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
