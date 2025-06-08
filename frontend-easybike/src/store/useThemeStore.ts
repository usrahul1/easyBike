import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
	theme: string;
	setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			theme: "black", // default
			setTheme: (theme: string) => set({ theme }),
		}),
		{
			name: "chat-theme", // localStorage key
		}
	)
);
