import React from "react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import YourBikes from "./pages/Profile/profile_your-bikes/YourBikes";
import Settings from "./pages/Profile/profile_settings/Settings";
import AboutPage from "./pages/AboutPage/AboutPage";
// import AdminPage from "./pages/AdminPage/AdminPage";
import Support from "./pages/Profile/profile_support/Support";
import Layout from "./components/layout/Layout";
import Sales from "./pages/Profile/profile_sales/Sales";
import Orders from "./pages/Profile/profile_orders/Orders";
import AppLayout from "./components/Admin/Admin Layout/adminLayout";
import Home from "./pages/AdminPage/Dashboard/Home";
import Bikes from "./pages/AdminPage/Tables/Bikes";
import Profiles from "./pages/AdminPage/Tables/Profiles";
import AllBikes from "./pages/AdminPage/Tables/AllBikes";
import AllProfiles from "./pages/AdminPage/Tables/AllProfiles";

const App = () => {
	return (
		<div className="font-space">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/user" element={<Layout />}>
					<Route index element={<DashboardPage />} />
					<Route path="dashboard" element={<DashboardPage />} />
					{/* matches "/user/dashboard" */}
					<Route path="your_bikes" element={<YourBikes />} />
					<Route path="settings" element={<Settings />} />
					<Route path="support" element={<Support />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="orders" element={<Orders />} />
					<Route path="sales" element={<Sales />} />
				</Route>

				<Route element={<AppLayout />}>
					<Route path="/admin" element={<Home />} />
					<Route path="/admin/bikes" element={<Bikes />} />
					<Route path="/admin/profiles" element={<Profiles />} />
					<Route path="/admin/all_bikes" element={<AllBikes />} />
					<Route path="/admin/all_profiles" element={<AllProfiles />} />
				</Route>
			</Routes>

			<Toaster />
		</div>
	);
};

export default App;
