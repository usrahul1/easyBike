import React from "react";
import styles from "./Footer.module.css";
import { ArrowUp } from "lucide-react";

const Footer = () => {
	return (
		<footer className="flex flex-col gap-4 bg-[#525050] justify-around pb-4 pt-4 items-center text-lg  text-[#fafafa] font-[500]">
			<div className="flex gap-5">
				<a className="cursor-pointer">
					<h4>Home</h4>
				</a>
				<a className="cursor-pointer">
					<h4>About</h4>
				</a>
				<a className="cursor-pointer">
					<h4>Terms</h4>
				</a>
				<a className="cursor-pointer">
					<h4>Contact</h4>
				</a>
			</div>
			<span className="select-none">&copy; easyBike.</span>
		</footer>
	);
};

export default Footer;
