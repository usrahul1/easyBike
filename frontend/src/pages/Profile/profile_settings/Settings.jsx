import { React, useState, useRef, useEffect } from "react";
import Sidebar2 from "../../../components/Sidebar/Sidebar2";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import { User, Camera, Mail } from "lucide-react";
import avatar from "../../../assets/avatar.png";

const Settings = () => {
	const firstScreenRef = useRef(null);
	const navigate = useNavigate();
	const firebase = useFirebase();
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
	const [profile, setProfile] = useState(null);
	const [profilePic, setProfilePic] = useState(avatar);

	useEffect(() => {
		const details = firebase.profDetails();
		if (details) {
			setProfile(details);
			if (details.photoURL != null) setProfilePic(details.photoURL);
		}
	}, [firebase]);

	useEffect(() => {
		if (!firebase.isLoggedIn) {
			navigate("/login");
		}
	}, [firebase, navigate]);

	return (
		<div className="flex min-h-screen">
			<div className={`h-screen} flex-1`} ref={firstScreenRef}>
				<div className="h-screen">
					<div className="max-w-2xl mx-auto p-4 py-8">
						<div className="bg-base-300 rounded-xl p-6 space-y-8">
							<div className="text-center">
								<h1 className="text-2xl font-semibold ">Profile</h1>
								<p className="mt-2">Your profile information</p>
							</div>

							{/* avatar */}

							<div className="flex flex-col items-center gap-4">
								<div className="relative">
									<img
										src={profilePic}
										alt="Profile"
										className="size-32 rounded-full object-cover border-4 border-gray-300"
									/>

									<label
										htmlFor="avatar-upload"
										className={`
                absolute bottom-0 right-0 
    	      	bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                  ${
										isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
									}
                `}
									>
										<Camera className="w-5 h-5 text-base-200" />
										<input
											type="file"
											id="avatar-upload"
											className="hidden"
											accept="image/*"
											// onChange={handleImageUpload}
											disabled={isUpdatingProfile}
										/>
									</label>
								</div>
								<p className="text-sm text-zinc-400">
									{isUpdatingProfile
										? "Uploading..."
										: "Click the camera icon to update your photo"}
								</p>
							</div>

							<div className="space-y-6">
								<div className="space-y-1.5">
									<div className="text-sm text-zinc-400 flex items-center gap-2">
										<User className="w-4 h-4" />
										Full Name
									</div>
									<p className="px-4 py-2.5 bg-base-200 rounded-lg border">
										{profile?.name || "Loading..."}
									</p>
								</div>

								<div className="space-y-1.5">
									<div className="text-sm text-zinc-400 flex items-center gap-2">
										<Mail className="w-4 h-4" />
										Email Address
									</div>
									<p className="px-4 py-2.5 bg-base-200 rounded-lg border">
										{profile?.email || "Loading..."}
									</p>
								</div>
							</div>

							<div className="mt-6 bg-base-300 rounded-xl p-6">
								<h2 className="text-lg font-medium  mb-4">
									Account Information
								</h2>
								<div className="space-y-3 text-sm">
									<div className="flex items-center justify-between py-2 border-b border-zinc-700">
										<span>Member Since</span>
										<span>{profile?.createdAt || "Loading..."}</span>
									</div>
									<div className="flex items-center justify-between py-2">
										<span>Account Status</span>
										<span className="text-green-500">Active</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
