import { Menu } from "lucide-react";
import UserDropdown from "../Admin/components/header/UserDropdown";
import { ThemeToggleButton } from "../Admin/components/common/ThemeToggleButton";
import { useSidebar } from "../../context/SidebarContext";

const Header: React.FC = () => {
	const { toggleSidebar } = useSidebar();

	return (
		<div className="sticky top-0 z-30 flex w-full border-b border-base-300 bg-base-100">
			<div className="flex w-full items-center justify-between px-4 py-3 lg:px-6">
				{/* Hamburger for mobile */}
				<button
					className="block lg:hidden p-2"
					onClick={toggleSidebar}
					aria-label="Toggle Sidebar"
				>
					<Menu size={24} />
				</button>

				<div className="flex items-center gap-3 ml-auto">
					<ThemeToggleButton />
					<UserDropdown />
				</div>
			</div>
		</div>
	);
};

export default Header;
