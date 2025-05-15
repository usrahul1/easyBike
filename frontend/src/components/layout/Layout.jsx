import React, { Children, useContext } from "react";
import Sidebar2 from "../Sidebar/Sidebar2";
import Header from "../Header/Header";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import Support from "../../pages/Profile/profile_support/Support";
import { SidebarProvider } from "../../context/SidebarContext";
import { SidebarContext } from "../../context/SidebarContext";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
	const { isSidebarOpen } = useContext(SidebarContext);
	return (
		<div className="flex">
			<div className="fixed top-0 left-0 h-screen text-white">
				<Sidebar2 />
			</div>

			<motion.div
				className={`flex flex-col w-full h-screen overflow-hidden transition-[margin] duration-300 ease-in-out ${
					isSidebarOpen ? "ml-[250px]" : "ml-[80px]"
				}`}
				animate={{ marginLeft: isSidebarOpen ? 250 : 80 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<div className="h-16 bg-white shadow flex-shrink-0">
					<Header />
				</div>
				<div className="flex-1 overflow-y-auto">
					<Outlet />
					<Footer />
				</div>
			</motion.div>
		</div>
	);
};

const finalLayout = () => {
	return (
		<SidebarProvider>
			<Layout />
		</SidebarProvider>
	);
};

export default finalLayout;
