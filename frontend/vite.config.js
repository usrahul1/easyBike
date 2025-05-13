import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		svgr({
			svgrOptions: {
				icon: true,
				exportType: "named",
				namedExport: "ReactComponent",
			},
		}),
	],
});

export const theme = {
	extend: {
		fontFamily: {
			rubik: ["Rubik Moonrocks", "sans-serif"],
			space: ["Space Grotesk", "sans-serif"],
		},
	},
};
