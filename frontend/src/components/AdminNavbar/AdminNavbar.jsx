import React from "react";
import logo from "../../assets/easyBike.png";
import { User } from "lucide-react";
import styles from "./AdminNavbar.module.css";

const AdminNavbar = () => {
	return (
		<div className="flex h-20 text-white items-center justify-around text-xl">
			<div className="flex items-center gap-2">
				<img src={logo} className="h-20 cursor-pointer" />
				<h5
					className={`text-2xl select-none cursor-pointer ${styles.adminNavbarH5}`}
				>
					easyBike
				</h5>
			</div>
			<div>
				<ul className={`flex gap-5 mr-25 ${styles.adminNavbarUl}`}>
					<li className={`cursor-pointer`}>Bookings</li>
					<li className={`cursor-pointer`}>All Bikes</li>
				</ul>
			</div>
			<div className="flex gap-2">
				<User />
				<button className="cursor-pointer">Logout</button>
			</div>
		</div>
	);
};

export default AdminNavbar;
