import React, { useState, useEffect } from "react";
import {
	SidebarProvider,
	useSidebar,
} from "../../../context/Admin Context/sidebarContext";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Admin Header/adminHeader";
import Backdrop from "../Backdrop/Backdrop";
import AppSidebar from "../Admin Sidebar/adminSidebar";
import { useThemeStore } from "../../../store/useThemeStore";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../../context/Firebase";

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
				<AdminHeader />
				<div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

const AppLayout: React.FC = () => {
	const navigate = useNavigate();
	const firebase = useFirebase();
	const [profileReady, setProfileReady] = useState(false);

	useEffect(() => {
		let attempts = 0;
		const maxAttempts = 50;

		const interval = setInterval(() => {
			const details = firebase.profDetails?.();
			console.log("Polling details:", details);

			if (details) {
				if (details.email !== "sairahulurumu@gmail.com") {
					navigate("/");
				} else {
					setProfileReady(true);
				}
				clearInterval(interval);
			} else {
				attempts++;
				if (attempts >= maxAttempts) {
					console.warn("No profile found after timeout — redirecting.");
					navigate("/");
					clearInterval(interval);
				}
			}
		}, 100);

		return () => clearInterval(interval);
	}, [firebase, navigate]);

	if (!profileReady) return null; // Or a loader/spinner

	return (
		<SidebarProvider>
			<LayoutContent />
		</SidebarProvider>
	);
};

export default AppLayout;
