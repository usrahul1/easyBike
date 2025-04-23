import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import YourBikes from "./pages/Profile/profile_your-bikes/YourBikes";
import YourBookings from "./pages/Profile/profile_your-bookings/YourBookings";
import Help from "./pages/Profile/profile_help/Help";
import Settings from "./pages/Profile/profile_settings/Settings";
import YourBillings from "./pages/Profile/profile_your-billings/YourBillings";

const App = () => {
	return (
		<div className="font-space">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/bike" element={<YourBikes />} />
				<Route path="/package" element={<YourBookings />} />
				<Route path="/receipt" element={<YourBillings />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/lifebuoy" element={<Help />} />
			</Routes>
		</div>
	);
};

export default App;
