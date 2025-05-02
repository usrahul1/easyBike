import React from "react";
import Footer from "../../components/Footer/Footer";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import styles from "./AdminPage.module.css";
import { Bike } from "lucide-react";

const AdminPage = () => {
	return (
		<div className="bg-[#2F2F2F] min-h-screen text-white">
			<AdminNavbar />
			<div className="grid grid-cols-2">
				{/* Left side */}
				<div className="justify-around border border-black">
					<div className="flex gap-2 items-center text-xl">
						<Bike />
						<h3>Bookings Tracker</h3>
					</div>
				</div>
				{/* Right Side */}
				<div className="border border-black">
					<div className="text-xl">
						<h3>Recent Bookings</h3>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AdminPage;
