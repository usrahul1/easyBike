import React from "react";
import { Link } from "react-router";

interface DropdownItemProps {
	tag?: "a" | "button";
	to?: string;
	onClick?: () => void;
	onItemClick?: () => void;
	baseClassName?: string;
	className?: string;
	children: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
	tag = "button",
	to,
	onClick,
	onItemClick,
	baseClassName = "block w-full text-left px-4 py-2 text-sm",
	className = "",
	children,
}) => {
	const combinedClasses = `${baseClassName} ${className}`.trim();

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		if (tag === "button") {
			event.preventDefault();
		}
		if (onClick) onClick();
		if (onItemClick) onItemClick();
	};

	if (tag === "a" && to) {
		return (
			<Link to={to} className={combinedClasses} onClick={handleClick}>
				{children}
			</Link>
		);
	}

	return (
		<button onClick={handleClick} className={combinedClasses}>
			{children}
		</button>
	);
};
