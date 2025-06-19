import React, { useState, useEffect } from "react";
import {
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
	type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import toast from "react-hot-toast";
import avatar from "../../assets/avatar.png";
import { useSidebar } from "../../context/SidebarContext";
import logo from "../../assets/logo.png";

interface Profile {
	name?: string | null;
	email?: string | null;
	photoURL?: string | null;
}

interface SidebarItem {
	name: string;
	icon: LucideIcon;
	color: string;
	href: string;
}

const Sidebar2: React.FC = () => {
	const { isSidebarOpen, toggleSidebar } = useSidebar();
	const firebase = useFirebase();
	const [verticalExpanded, setVerticalExpanded] = useState(false);
	const [profilePic, setProfilePic] = useState<string>(avatar);
	const [profile, setProfile] = useState<Profile | null>(null);

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

	const SIDEBAR_ITEMS: SidebarItem[] = [
		{
			name: "Dashboard",
			icon: LayoutDashboard,
			color: "text-primary",
			href: "/user/dashboard",
		},
		{
			name: "Your Bikes",
			icon: Bike,
			color: "text-secondary",
			href: "/user/your_bikes",
		},
		{
			name: "Sales",
			icon: DollarSign,
			color: "text-success",
			href: "/user/sales",
		},
		{
			name: "Orders",
			icon: ShoppingCart,
			color: "text-warning",
			href: "/user/orders",
		},
		{
			name: "Settings",
			icon: Settings,
			color: "text-info",
			href: "/user/settings",
		},
		{
			name: "Support",
			icon: LifeBuoy,
			color: "text-error",
			href: "/user/support",
		},
	];

	return (
		<motion.div
			className={`h-screen transition-all duration-300 ease-in-out flex-shrink-0 border-r border-base-300 bg-base-100 brightness-125`}
			animate={{ width: isSidebarOpen ? 250 : 80 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<div className="h-full p-4 flex flex-col">
				<div className="flex items-center justify-between">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={toggleSidebar}
						className="p-2 rounded-full max-w-fit hover:bg-base-200 hover:text-primary cursor-pointer"
						aria-label="Toggle sidebar"
					>
						<Menu size={20} />
					</motion.button>
					{isSidebarOpen && (
						<motion.span
							className="ml-4 whitespace-nowrap flex items-center"
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: "auto" }}
							exit={{ opacity: 0, width: 0 }}
							transition={{ duration: 0.2, delay: 0.3 }}
						>
							<h1 className="select-none text-base mr-2">easyBike</h1>
							<img className="h-11 w-11" src={logo} />
						</motion.span>
					)}
				</div>

				<nav className="flex-grow mt-4">
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className="flex items-center gap-2 p-4 font-[450] rounded-lg transition-colors text-sm hover:bg-base-200 hover:text-primary cursor-pointer">
								<item.icon size={16} className={`${item.color} text-current`} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className="ml-4 whitespace-nowrap text-sm"
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
					))}
				</nav>

				{isSidebarOpen && verticalExpanded && (
					<motion.div
						className="p-4 rounded-lg shadow-md mt-4 bg-base-100 border border-base-300"
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
								<motion.button className="btn btn-sm btn-outline w-full justify-center gap-2">
									<User size={16} />
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
									className="btn btn-sm btn-outline w-full justify-center gap-2"
								>
									<LogOut size={16} />
									Logout
								</motion.button>
							</motion.li>
						</ul>
					</motion.div>
				)}

				<motion.div
					className={`flex ${
						isSidebarOpen ? "p-3" : "p-0"
					} justify-center items-center border-t border-base-300 bg-base-100`}
				>
					<img
						src={profilePic}
						alt="User"
						className={`w-8 cursor-pointer flex justify-center items-center ${
							isSidebarOpen ? "" : "mx-auto mt-2"
						} rounded-full`}
					/>

					<AnimatePresence>
						{isSidebarOpen && (
							<motion.div
								className={`flex gap-2 justify-between items-center w-[15.625rem]`}
							>
								<motion.span
									className="ml-4 whitespace-nowrap"
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2, delay: 0.3 }}
								>
									<motion.div className="leading-4">
										<h4 className="font-semibold text-sm">
											{profile?.name ?? "Loading..."}
										</h4>
										<span className="text-[0.6rem]">
											{profile?.email ?? "Loading..."}
										</span>
									</motion.div>
								</motion.span>
								<button
									className="cursor-pointer transition pr-2"
									onClick={() => setVerticalExpanded((prev) => !prev)}
									aria-label="Toggle profile options"
								>
									<MoreVertical size={18} />
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Sidebar2;
