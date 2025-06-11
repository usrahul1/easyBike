import type { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
	children: ReactNode;
	size?: "sm" | "md";
	variant?: "primary" | "outline";
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	disabled?: boolean;
};

const Button = ({
	children,
	size = "md",
	variant = "primary",
	startIcon,
	endIcon,
	onClick,
	className = "",
	disabled = false,
}: ButtonProps): JSX.Element => {
	// Size Classes
	const sizeClasses: Record<"sm" | "md", string> = {
		sm: "btn-sm",
		md: "btn-md",
	};

	// Variant Classes
	const variantClasses: Record<"primary" | "outline", string> = {
		primary: "btn-primary",
		outline: "btn-outline",
	};

	return (
		<button
			className={`btn ${sizeClasses[size]} ${variantClasses[variant]} ${
				disabled ? "btn-disabled" : ""
			} ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{startIcon && <span className="flex items-center">{startIcon}</span>}
			{children}
			{endIcon && <span className="flex items-center">{endIcon}</span>}
		</button>
	);
};

export default Button;
	