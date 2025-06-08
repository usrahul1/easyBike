import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

interface SidebarContextType {
	isExpanded: boolean;
	isMobileOpen: boolean;
	isHovered: boolean;
	activeItem: string | null;
	openSubmenu: string | null;
	toggleSidebar: () => void;
	toggleMobileSidebar: () => void;
	setIsHovered: Dispatch<SetStateAction<boolean>>;
	setActiveItem: Dispatch<SetStateAction<string | null>>;
	toggleSubmenu: (item: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};

interface SidebarProviderProps {
	children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
	children,
}) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(true);
	const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [activeItem, setActiveItem] = useState<string | null>(null);
	const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			if (!mobile) {
				setIsMobileOpen(false);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleSidebar = () => setIsExpanded((prev) => !prev);

	const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);

	const toggleSubmenu = (item: string) => {
		setOpenSubmenu((prev) => (prev === item ? null : item));
	};

	return (
		<SidebarContext.Provider
			value={{
				isExpanded: isMobile ? false : isExpanded,
				isMobileOpen,
				isHovered,
				activeItem,
				openSubmenu,
				toggleSidebar,
				toggleMobileSidebar,
				setIsHovered,
				setActiveItem,
				toggleSubmenu,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};
