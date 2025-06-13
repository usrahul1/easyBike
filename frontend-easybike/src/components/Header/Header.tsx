import UserDropdown from "../Admin/components/header/UserDropdown";
import { ThemeToggleButton } from "../Admin/components/common/ThemeToggleButton";

const Header: React.FC = () => {
	// const [isApplicationMenuOpen, setApplicationMenuOpen] =
	// 	useState<boolean>(false);
	// const [isExpanded, setIsExpanded] = useState<boolean>(true);

	return (
		<div className="sticky top-0 flex w-full border-y brightness-125 border-base-300 bg-base-100">
			<div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
				<div
					className={`
            items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none
          `}
				>
					<div className="flex items-center gap-2 2xsm:gap-3">
						<ThemeToggleButton />
					</div>
					<UserDropdown />
				</div>
			</div>
		</div>
	);
};

export default Header;
