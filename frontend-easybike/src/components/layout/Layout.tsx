import React, { useContext } from "react";
import Sidebar2 from "../Sidebar/Sidebar2";
import Header from "../Header/Header";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useThemeStore } from "../../store/useThemeStore";
// import MobileNav from "../MobileNav/MobileNav";

const Layout: React.FC = () => {
	const { isSidebarOpen } = useSidebar();
	const { theme } = useThemeStore();

	return (
		<div data-theme={theme} className="flex min-h-screen">
			<div className="fixed top-0 left-0 h-screen">
				<Sidebar2 />
			</div>

			<motion.div
				className={`flex flex-col w-full h-screen overflow-hidden transition-[margin] duration-300 ease-in-out ${
					isSidebarOpen ? "ml-[250px]" : "ml-[80px]"
				}`}
				animate={{ marginLeft: isSidebarOpen ? 250 : 80 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<div className="h-16 shadow flex-shrink-0">
					{/* <MobileNav className="md:hidden" /> */}
					<Header />
				</div>
				<div className="flex flex-col flex-grow overflow-y-auto">
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
