import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
});

export const theme = {
	extend: {
		fontFamily: {
			rubik: ["Rubik Moonrocks", "sans-serif"],
			space: ["Space Grotesk", "sans-serif"],
		},
	},
};
