import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
	ChevronDownIcon,
	GridIcon,
	HorizontaLDots,
	TableIcon,
} from "../../../assets/icons";
import {
	LayoutDashboard,
	Bike,
	DollarSign,
	ShoppingCart,
	Settings,
	LifeBuoy,
} from "lucide-react";
import { useSidebar } from "../../../context/Admin Context/sidebarContext";
import logo from "../../../assets/logo.png";

type NavItem = {
	name: string;
	icon: React.ReactNode;
	path?: string;
	subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItemsAdmin: NavItem[] = [
	{
		icon: <GridIcon />,
		name: "Dashboard",
		subItems: [{ name: "Statistics", path: "/admin", pro: false }],
	},
	{
		name: "Profiles and Bikes",
		icon: <TableIcon />,
		subItems: [
			{ name: "Bike Orders", path: "/admin/all_orders", pro: false },
			{ name: "Bike Requests", path: "/admin/bikes", pro: false },
			{ name: "All profiles", path: "/admin/all_profiles", pro: false },
			{ name: "All bikes", path: "/admin/all_bikes", pro: false },
		],
	},
];

const navItemsContent: NavItem[] = [
	{
		icon: <LayoutDashboard size={16} />,
		name: "Dashboard",
		subItems: [{ name: "Dashboard", path: "/user/dashboard", pro: false }],
	},
	{
		icon: <Bike size={16} />,
		name: "Your Bikes",
		subItems: [{ name: "Your Bikes", path: "/user/your_bikes", pro: false }],
	},
	{
		icon: <DollarSign size={16} />,
		name: "Sales",
		subItems: [{ name: "Sales", path: "/user/sales", pro: false }],
	},
	{
		icon: <ShoppingCart size={16} />,
		name: "Orders",
		subItems: [{ name: "Orders", path: "/user/orders", pro: false }],
	},
	{
		icon: <Settings size={16} />,
		name: "Settings",
		subItems: [{ name: "Settings", path: "/user/settings", pro: false }],
	},
	{
		icon: <LifeBuoy size={16} />,
		name: "Support",
		subItems: [{ name: "Support", path: "/user/support", pro: false }],
	},
];

interface AppLayoutProps {
	admin?: boolean;
}

const AppSidebar: React.FC<AppLayoutProps> = ({ admin = false }) => {
	const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
	const location = useLocation();

	const [openSubmenu, setOpenSubmenu] = useState<{
		type: "main";
		index: number;
	} | null>(null);
	const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
		{}
	);
	const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const isActive = useCallback(
		(path: string) => location.pathname === path,
		[location.pathname]
	);

	const activeNavItems = admin ? navItemsAdmin : navItemsContent;

	useEffect(() => {
		let submenuMatched = false;
		activeNavItems.forEach((nav, index) => {
			if (nav.subItems) {
				nav.subItems.forEach((subItem) => {
					if (isActive(subItem.path)) {
						setOpenSubmenu({ type: "main", index });
						submenuMatched = true;
					}
				});
			}
		});

		if (!submenuMatched) {
			setOpenSubmenu(null);
		}
	}, [location, isActive, admin]);

	useEffect(() => {
		if (openSubmenu !== null) {
			const key = `main-${openSubmenu.index}`;
			if (subMenuRefs.current[key]) {
				setSubMenuHeight((prev) => ({
					...prev,
					[key]: subMenuRefs.current[key]?.scrollHeight || 0,
				}));
			}
		}
	}, [openSubmenu]);

	const handleSubmenuToggle = (index: number) => {
		setOpenSubmenu((prev) =>
			prev && prev.index === index ? null : { type: "main", index }
		);
	};

	const renderMenuItems = (items: NavItem[]) => (
		<ul className="flex flex-col gap-2">
			{items.map((nav, index) => (
				<li key={nav.name}>
					{nav.subItems ? (
						<button
							onClick={() => handleSubmenuToggle(index)}
							className={`flex items-center w-full rounded-md transition px-3 py-2 text-sm ${
								openSubmenu?.index === index
									? "bg-base-200 font-semibold"
									: "hover:bg-base-200"
							} ${
								!isExpanded && !isHovered
									? "lg:justify-center"
									: "lg:justify-start"
							}`}
						>
							<span className="w-5 h-5">{nav.icon}</span>
							{(isExpanded || isHovered || isMobileOpen) && (
								<span className="ml-3">{nav.name}</span>
							)}
							{(isExpanded || isHovered || isMobileOpen) && (
								<ChevronDownIcon
									className={`ml-auto w-4 h-4 transition-transform duration-200 ${
										openSubmenu?.index === index
											? "rotate-180 text-primary"
											: "text-base-content/60"
									}`}
								/>
							)}
						</button>
					) : (
						nav.path && (
							<Link
								to={nav.path}
								className={`flex items-center w-full rounded-md transition px-3 py-2 text-sm ${
									isActive(nav.path)
										? "bg-base-200 font-semibold"
										: "hover:bg-base-200"
								}`}
							>
								<span className="w-5 h-5">{nav.icon}</span>
								{(isExpanded || isHovered || isMobileOpen) && (
									<span className="ml-3">{nav.name}</span>
								)}
							</Link>
						)
					)}

					{nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
						<div
							ref={(el) => {
								subMenuRefs.current[`main-${index}`] = el;
							}}
							className="overflow-hidden transition-all duration-300"
							style={{
								height:
									openSubmenu?.index === index
										? `${subMenuHeight[`main-${index}`]}px`
										: "0px",
							}}
						>
							<ul className="mt-2 space-y-1 ml-6">
								{nav.subItems.map((subItem) => (
									<li key={subItem.name}>
										<Link
											to={subItem.path}
											className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition ${
												isActive(subItem.path)
													? "bg-base-200 font-medium"
													: "hover:bg-base-200"
											}`}
										>
											{subItem.name}
											<span className="flex items-center gap-1 ml-auto">
												{subItem.new && (
													<span
														className={`badge badge-xs ${
															isActive(subItem.path)
																? "badge-primary"
																: "badge-neutral"
														}`}
													>
														new
													</span>
												)}
												{subItem.pro && (
													<span
														className={`badge badge-xs ${
															isActive(subItem.path)
																? "badge-secondary"
																: "badge-neutral"
														}`}
													>
														pro
													</span>
												)}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</li>
			))}
		</ul>
	);

	return (
		<aside
			className={`fixed z-[99999] mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-base-100 text-base-content h-screen transition-all duration-300 ease-in-out border-r border-base-300
        ${
					isExpanded || isMobileOpen
						? "w-[290px]"
						: isHovered
						? "w-[290px]"
						: "w-[90px]"
				}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
			onMouseEnter={() => !isExpanded && setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={`py-8 flex ${
					!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
				}`}
			>
				<Link to="/" className="flex items-center gap-2">
					<img
						src={logo}
						alt="easyBike"
						className="w-11 h-11 object-cover rounded-full"
					/>
					{(isExpanded || isHovered) && (
						<span className="whitespace-nowrap text-ellipsis truncate max-w-[100px]">
							easyBike
						</span>
					)}
				</Link>
			</div>

			<div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
				<nav className="mb-6">
					<div className="flex flex-col gap-4">
						<div>
							<h2
								className={`mb-4 text-xs uppercase flex leading-[20px] ${
									!isExpanded && !isHovered
										? "lg:justify-center"
										: "justify-start"
								}`}
							>
								{isExpanded || isHovered || isMobileOpen ? (
									"Menu"
								) : (
									<HorizontaLDots className="size-6" />
								)}
							</h2>

							{admin
								? renderMenuItems(navItemsAdmin)
								: renderMenuItems(navItemsContent)}
							{/* {renderMenuItems(navItems)} */}
						</div>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default AppSidebar;
