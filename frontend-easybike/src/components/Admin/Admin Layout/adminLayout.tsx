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
import Footer from "../../Footer/Footer";

const LayoutContent: React.FC<AppLayoutProps> = ({ admin = false }) => {
	const { isExpanded, isHovered, isMobileOpen } = useSidebar();
	const { theme } = useThemeStore();

	return (
		<div data-theme={theme} className="min-h-screen xl:flex">
			<div>
				<AppSidebar admin={admin} />
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
				<Footer />
			</div>
		</div>
	);
};

interface AppLayoutProps {
	admin?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ admin = false }) => {
	const navigate = useNavigate();
	const firebase = useFirebase();
	const [profileReady, setProfileReady] = useState(false);

	useEffect(() => {
		if (!firebase.isLoggedIn) return;

		let attempts = 0;
		const maxAttempts = 50;

		const interval = setInterval(() => {
			const profile = firebase.profDetails?.();
			console.log(`Attempt ${attempts + 1}:`, profile);

			attempts++;

			if (profile) {
				const email = profile.email?.toLowerCase();
				const adminEmail = "sairahulurumu@gmail.com";

				if (admin) {
					if (email === adminEmail) {
						console.log("✅ Admin verified.");
						setProfileReady(true);
						clearInterval(interval); // stop loop ONLY when correct admin
					} else {
						console.warn("⚠️ Not admin, will keep checking...");
					}
				} else {
					console.log("✅ Normal user verified.");
					setProfileReady(true);
					clearInterval(interval); // normal users stop early
				}
			}

			if (attempts >= maxAttempts) {
				console.warn("❌ Max attempts reached. Redirecting...");
				navigate("/");
				clearInterval(interval);
			}
		}, 100);

		return () => clearInterval(interval);
	}, [firebase, navigate, admin]);

	if (!profileReady) return null;

	return (
		<SidebarProvider>
			<LayoutContent admin={admin} />
		</SidebarProvider>
	);
};

export default AppLayout;
