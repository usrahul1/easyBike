import React from "react";
import { useThemeStore } from "../../../../store/useThemeStore";
import { Moon, Sun } from "lucide-react";

export const ThemeToggleButton: React.FC = () => {
	const { theme, setTheme } = useThemeStore();

	const toggleTheme = () => {
		setTheme(theme === "black" ? "light" : "black");
	};

	return (
		<button onClick={toggleTheme} className="btn btn-circle text-base-content">
			{theme === "black" ? (
				<Sun className="w-5 h-5" />
			) : (
				<Moon className="w-5 h-5" />
			)}
		</button>
	);
};
