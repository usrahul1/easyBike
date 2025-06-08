import React from "react";
import {
	SidebarProvider,
	useSidebar,
} from "../../../context/Admin Context/sidebarContext";
import { Outlet } from "react-router-dom"; // Use react-router-dom instead of react-router for web apps
import AppHeader from "../Admin Header/adminHeader";
import Backdrop from "../Backdrop/Backdrop";
import AppSidebar from "../Admin Sidebar/adminSidebar";
import { useThemeStore } from "../../../store/useThemeStore";

const LayoutContent: React.FC = () => {
	const { isExpanded, isHovered, isMobileOpen } = useSidebar();
	const { theme } = useThemeStore();

	return (
		<div data-theme={theme} className="min-h-screen xl:flex">
			<div>
				<AppSidebar />
				<Backdrop />
			</div>
			<div
				className={`flex-1 transition-all duration-300 ease-in-out ${
					isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
				} ${isMobileOpen ? "ml-0" : ""}`}
			>
				<AppHeader />
				<div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

const AppLayout: React.FC = () => {
	return (
		<SidebarProvider>
			<LayoutContent />
		</SidebarProvider>
	);
};

export default AppLayout;
