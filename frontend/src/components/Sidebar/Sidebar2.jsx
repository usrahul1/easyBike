import React, { useState } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
// import { logo } from "../../assets/avatar-removebg.png";

const Sidebar2 = ({ expand }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const firebase = useFirebase();
	const [verticalExpanded, setVerticalExpanded] = useState(false);

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
			href: "/bikes",
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
				animate={{ width: isSidebarOpen ? 256 : 80 }}
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
											size={24}
											style={{ color: item.color, minWidth: "20px" }}
										/>
										<AnimatePresence>
											{isSidebarOpen && (
												<motion.span
													className="ml-4 whitespace-nowrap"
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

					{verticalExpanded ? (
						<motion.div className="">
							<ul className="">
								<li>
									<button>Profile</button>
								</li>
								<li>
									<button onClick={firebase.logOut} className="border-black">
										Logout
									</button>
								</li>
							</ul>
						</motion.div>
					) : (
						""
					)}
					<motion.div
						className={`border-t flex ${
							isSidebarOpen ? "p-3" : "p-0"
						}  justify-center items-center`}
					>
						<button
							onClick={
								isSidebarOpen ? "" : () => setVerticalExpanded((prev) => !prev)
							}
						>
							<User
								src="https://via.placeholder.com/40"
								className={`h-10 rounded-md cursor-pointer w-8 flex justify-center items-center
								${isSidebarOpen ? "" : "mx-auto"}
								`}
								alt="User"
								size={20}
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
												{isSidebarOpen ? "John Doe" : ""}
											</h4>
											<span className="text-xs text-gray-600">
												{isSidebarOpen ? "johndoe@gmail.com" : ""}
											</span>
										</motion.div>
									</motion.span>
								)}
								{isSidebarOpen ? (
									<motion.button
										onClick={() => setVerticalExpanded((prev) => !prev)}
										className="cursor-pointer"
									>
										<MoreVertical size={20} />
									</motion.button>
								) : (
									""
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
