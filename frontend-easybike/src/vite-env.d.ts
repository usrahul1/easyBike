// svg.d.ts
/// <reference types="vite-plugin-svgr/client" />
declare module "*.css";
declare module "*.scss";
declare module "*.jsx";

declare module "*.jsx" {
	const component: any;
	export default component;
}

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "*.png" {
	const value: string;
	export default value;
}
declare module "*.svg" {
	import * as React from "react";
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const defaultExport: React.FC<React.SVGProps<SVGSVGElement>>;
	export default defaultExport;
}

declare module "*.gif" {
	const value: string;
	export default value;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_FIREBASE_API_KEY: string;
	readonly VITE_FIREBASE_AUTH_DOMAIN: string;
	readonly VITE_FIREBASE_PROJECT_ID: string;
	readonly VITE_FIREBASE_STORAGE_BUCKET: string;
	readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
	readonly VITE_FIREBASE_APP_ID: string;
	readonly VITE_FIREBASE_MEASUREMENT_ID: string;
	// add more if you have
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
