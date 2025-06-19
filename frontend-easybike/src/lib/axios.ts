import axios from "axios";
import type { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
	throw new Error("VITE_API_URL is not defined in environment variables");
}

export const axiosInstance: AxiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});
