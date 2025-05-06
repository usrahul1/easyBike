import React, { useState, useEffect } from "react";
import {
	Users,
	DollarSign,
	ShoppingCart,
	Settings,
	Menu,
	LayoutDashboard,
	Bike,
	LifeBuoy,
	User,
	MoreVertical,
	LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import toast from "react-hot-toast";
import avatar from "../../assets/avatar.png";

const Sidebar2 = ({ expand }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const firebase = useFirebase();
	const [verticalExpanded, setVerticalExpanded] = useState(false);
	const [profilePic, setProfilePic] = useState(avatar);
	const [profile, setProfile] = useState(null);

	const logOutHandler = () => {
		firebase.logOut();
		toast.success("Logged Out!");
	};
	useEffect(() => {
		const details = firebase.profDetails();
		if (details) {
			setProfile(details);
			if (details.photoURL != null) setProfilePic(details.photoURL);
		}
	}, [firebase]);

	const SIDEBAR_ITEMS = [
		{
			name: "Dashboard",
			icon: LayoutDashboard,
			color: "#6366f1",
			href: "/dashboard",
		},
		{
			name: "Your Bikes",
			icon: Bike,
			color: "#8B5CF6",
			href: "/your_bikes",
		},
		{
			name: "Sales",
			icon: DollarSign,
			color: "#10B981",
			href: "/sales",
		},
		{
			name: "Orders",
			icon: ShoppingCart,
			color: "#F59E0B",
			href: "/orders",
		},
		{
			name: "Settings",
			icon: Settings,
			color: "#6EE7B7",
			href: "/settings",
		},
		{
			name: "Support",
			icon: LifeBuoy,
			color: "#6EE7B7",
			href: "/support",
		},
	];

	return (
		<>
			<motion.div
				className={`fixed h-screen z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
					isSidebarOpen ? "w-64" : "w-20"
				}`}
				animate={{ width: isSidebarOpen ? 300 : 80 }}
				transition={{ duration: 0.3, ease: "easeInOut" }} // ✅ ADD THIS LINE
			>
				<div className="h-full bg-white bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
					<div className="flex  items-center justify-between">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => {
								setSidebarOpen(!isSidebarOpen);
								expand();
							}}
							className="p-2 rounded-full hover:bg-gray-300 transition-colors max-w-fit"
						>
							<Menu size={24} />
						</motion.button>
						{isSidebarOpen ? (
							<motion.span
								className="ml-4 whitespace-nowrap"
								initial={{ opacity: 0, width: 0 }}
								animate={{ opacity: 1, width: "auto" }}
								exit={{ opacity: 0, width: 0 }}
								transition={{ duration: 0.2, delay: 0.3 }}
							>
								<h1 className="select-none text-xl mr-2">easyBike</h1>
								{/* <img src={logo} /> */}
							</motion.span>
						) : (
							""
						)}
					</div>

					<nav className="mt-8 flex-grow">
						{SIDEBAR_ITEMS.map((item) => {
							return (
								<Link key={item.href} to={item.href}>
									<motion.div className="flex items-center gap-3 p-4 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors mb-2">
										<item.icon
											size={26}
											style={{ color: item.color, minWidth: "20px" }}
										/>
										<AnimatePresence>
											{isSidebarOpen && (
												<motion.span
													className="ml-4 whitespace-nowrap text-base"
													initial={{ opacity: 0, width: 0 }}
													animate={{ opacity: 1, width: "auto" }}
													exit={{ opacity: 0, width: 0 }}
													transition={{ duration: 0.2, delay: 0.3 }}
												>
													{item.name}
												</motion.span>
											)}
										</AnimatePresence>
									</motion.div>
								</Link>
							);
						})}
					</nav>

					{isSidebarOpen && verticalExpanded ? (
						<motion.div
							className="p-4 bg-white rounded-lg shadow-md mt-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<ul className="space-y-4">
								<motion.li
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: 20, opacity: 0 }}
									transition={{ duration: 0.3 }}
								>
									<motion.button className="w-full py-2.5 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-100 text-indigo-600 font-semibold hover:bg-indigo-200 transition-colors">
										<User />
										Profile
									</motion.button>
								</motion.li>
								<motion.li
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: 20, opacity: 0 }}
									transition={{ duration: 0.3 }}
								>
									<motion.button
										onClick={logOutHandler}
										className="w-full py-2.5 rounded-lg flex cursor-pointer items-center justify-center gap-2 bg-rose-100 text-rose-600 font-semibold hover:bg-rose-200 transition-colors"
									>
										<LogOut />
										Logout
									</motion.button>
								</motion.li>
							</ul>
						</motion.div>
					) : null}

					{/* <motion.div
						className={`border-t flex ${
							isSidebarOpen ? "p-3" : "p-0"
						}  justify-center items-center`}
					>
						<button onClick={() => setVerticalExpanded((prev) => !prev)}>
							<img
								src={profilePic}
								alt="User"
								size={18}
								className={`w-8 mt-2 cursor-pointer flex justify-center items-center
									${isSidebarOpen ? "" : "mx-auto"} rounded-full`}
							/>
						</button>

						<AnimatePresence>
							<motion.div
								className={`flex justify-between items-center ${
									isSidebarOpen ? "w-64" : "w-0"
								}`}
							>
								{isSidebarOpen && (
									<motion.span
										className="ml-4 whitespace-nowrap"
										initial={{ opacity: 0, width: 0 }}
										animate={{ opacity: 1, width: "auto" }}
										exit={{ opacity: 0, width: 0 }}
										transition={{ duration: 0.2, delay: 0.3 }}
									>
										<motion.div className="leading-4">
											<h4 className="font-semibold">
												{isSidebarOpen ? profile?.name : "Loading..."}
											</h4>
											<span className="text-xs text-gray-600">
												{isSidebarOpen ? profile?.email : "Loading..."}
											</span>
										</motion.div>
									</motion.span>
								)}
								{isSidebarOpen ? (
									<button
										className="border-2 border-black"
										onClick={() => setVerticalExpanded((prev) => !prev)}
									>
										<MoreVertical size={20} />
									</button>
								) : (
									""
								)}
							</motion.div>
						</AnimatePresence>
					</motion.div> */}
					<motion.div
						className={`border-t flex ${
							isSidebarOpen ? "p-3" : "p-0"
						}  justify-center items-center`}
					>
						<img
							src={profilePic}
							alt="User"
							className={`w-8 cursor-pointer flex justify-center items-center
				${isSidebarOpen ? "" : "mx-auto mt-2"} rounded-full`}
						/>

						<AnimatePresence>
							<motion.div
								className={`flex justify-between items-center ${
									isSidebarOpen ? "w-[18.75rem]" : "w-0"
								}`}
							>
								{isSidebarOpen && (
									<motion.span
										className="ml-4 whitespace-nowrap"
										initial={{ opacity: 0, width: 0 }}
										animate={{ opacity: 1, width: "auto" }}
										exit={{ opacity: 0, width: 0 }}
										transition={{ duration: 0.2, delay: 0.3 }}
									>
										<motion.div className="leading-4">
											<h4 className="font-semibold">
												{profile?.name || "Loading..."}
											</h4>
											<span className="text-xs text-gray-600">
												{profile?.email || "Loading..."}
											</span>
										</motion.div>
									</motion.span>
								)}
								{isSidebarOpen && (
									<button
										className=" cursor-pointer transition pr-2"
										onClick={() => setVerticalExpanded((prev) => !prev)}
									>
										<MoreVertical size={20} className="text-gray-700" />
									</button>
								)}
							</motion.div>
						</AnimatePresence>
					</motion.div>
				</div>
			</motion.div>
		</>
	);
};

export default Sidebar2;
