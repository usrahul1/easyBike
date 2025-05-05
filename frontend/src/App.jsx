import React from "react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import YourBikes from "./pages/Profile/profile_your-bikes/YourBikes";
import YourBookings from "./pages/Profile/profile_your-bookings/YourBookings";
import Settings from "./pages/Profile/profile_settings/Settings";
import YourBillings from "./pages/Profile/profile_your-billings/YourBillings";
import AboutPage from "./pages/AboutPage/AboutPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Support from "./pages/Profile/profile_support/Support";
import Layout from "./components/layout/Layout";

const App = () => {
	return (
		<div className="font-space">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/your_bikes" element={<YourBikes />} />
				<Route path="/package" element={<YourBookings />} />
				<Route path="/receipt" element={<YourBillings />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/support" element={<Support />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/admin" element={<AdminPage />} />
			</Routes>

			<Toaster />
		</div>
	);
};

export default App;
