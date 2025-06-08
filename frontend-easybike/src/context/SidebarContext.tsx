import { createContext, useState, useContext } from "react";
import type { FC, ReactNode } from "react";

interface SidebarContextType {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
	children: ReactNode;
}

const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => setSidebarOpen((prev) => !prev);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
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
