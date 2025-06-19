// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		svgr({
			include: "**/*.svg",
			svgrOptions: {
				exportType: "default", // export default component
				icon: true, // optional: scale icons
				svgo: true, // optimize SVGs
			},
		}),
	],
	server: {
		host: true,
	},
});
