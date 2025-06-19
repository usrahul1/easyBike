import { createContext, useState, useContext, useEffect } from "react";
import type { FC, ReactNode } from "react";

interface SidebarContextType {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	isMobileOpen: boolean;
	toggleMobileSidebar: () => void;
	closeMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
	children: ReactNode;
}

const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isMobileOpen, setMobileOpen] = useState(false);

	// Optional: Close mobile sidebar on route change or resize
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setMobileOpen(false);
				setSidebarOpen(true); // ensure desktop sidebar stays open
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleSidebar = () => setSidebarOpen((prev) => !prev);
	const toggleMobileSidebar = () => setMobileOpen((prev) => !prev);
	const closeMobileSidebar = () => setMobileOpen(false);

	return (
		<SidebarContext.Provider
			value={{
				isSidebarOpen,
				toggleSidebar,
				isMobileOpen,
				toggleMobileSidebar,
				closeMobileSidebar,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

function useSidebar(): SidebarContextType {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
}

export { SidebarProvider, useSidebar };
