import React, { useEffect, useRef } from "react";

interface DropdownProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
	isOpen,
	onClose,
	children,
	className = "",
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(target) &&
				!target.closest(".dropdown-toggle")
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	if (!isOpen) return null;

	return (
		<div
			ref={dropdownRef}
			className={`absolute z-40 right-0 mt-2 rounded-xl${className}`}
		>
			{children}
		</div>
	);
};
