import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { useSidebar } from "../../../context/Admin Context/sidebarContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import UserDropdown from "../components/header/UserDropdown";
// import { SidebarContext } from "../../../context/Admin Context/sidebarContext";

const AppHeader = () => {
	const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
	// const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
	// const { isSidebarOpen } = useContext(SidebarContext);

	// useEffect(() => {}, [isSidebarOpen]);

	// const handleToggle = () => {
	// 	if (window.innerWidth >= 1024) toggleSidebar();
	// } else {
	// 	// toggleMobileSidebar();
	// }
	// };

	// const toggleApplicationMenu = () => {
	// 	setApplicationMenuOpen(!isApplicationMenuOpen);
	// };

	const inputRef = useRef(null);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === "k") {
				event.preventDefault();
				inputRef.current?.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<header
			className={`sticky top-0 flex bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b `}
		>
			<div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
				<div
					className={`${
						isApplicationMenuOpen ? "flex" : "hidden"
					} items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
				>
					<div className="flex items-center gap-2 2xsm:gap-3">
						<ThemeToggleButton />
					</div>
					<UserDropdown />
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
