import React from "react";
import InstagramIcon from "../icons/Insta";
import Fb from "../icons/Fb";

const Navbar = () => {
	return (
		<nav className="flex gap-5 border-2 border-black">
			<InstagramIcon />
			<Fb />
			<div className="login">
				<button
					type="submit"
					className="px-2 py-2 pt-1 pb-1 border-2 border-white rounded-lg"
				>
					Login
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
