import React from "react";
import Sidebar2 from "../Sidebar/Sidebar2";
import Header from "../Header/Header";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useThemeStore } from "../../store/useThemeStore";

const Layout: React.FC = () => {
	const { isSidebarOpen } = useSidebar();
	const { theme } = useThemeStore();

	const sidebarWidth = isSidebarOpen ? 250 : 80;

	return (
		<div data-theme={theme} className="flex min-h-screen bg-base-100">
			{/* Sidebar */}
			<div
				className={`
					fixed top-0 left-0 h-screen z-40 transition-all duration-300
					${isSidebarOpen ? "w-[250px]" : "w-[80px]"}
					hidden lg:block
				`}
			>
				<Sidebar2 />
				{/* <Backdrop /> */}
			</div>

			{/* Main Content */}
			<motion.div
				className="flex flex-col w-full min-h-screen transition-[margin] duration-300 ease-in-out"
				animate={{
					marginLeft:
						typeof window !== "undefined" && window.innerWidth >= 1024
							? sidebarWidth
							: 0,
				}}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				{/* Header */}
				<div className="shadow flex-shrink-0 z-30">
					<Header />
				</div>

				{/* Content */}
				<div className="flex flex-col flex-grow overflow-y-auto min-w-0">
					<main className="flex-grow">
						<Outlet />
					</main>
					<Footer />
				</div>
			</motion.div>
		</div>
	);
};

const FinalLayout: React.FC = () => {
	return (
		<SidebarProvider>
			<Layout />
		</SidebarProvider>
	);
};

export default FinalLayout;
