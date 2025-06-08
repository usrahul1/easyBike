import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="bg-base-200 text-base-content flex flex-col gap-4 justify-around py-6 items-center text-lg font-medium border-t border-base-300">
			<div className="flex flex-wrap justify-center gap-5">
				<a className="link link-hover">Home</a>
				<a className="link link-hover">About</a>
				<a className="link link-hover">Terms</a>
				<a className="link link-hover">Contact</a>
			</div>
			<span className="select-none text-sm opacity-70">&copy; easyBike.</span>
		</footer>
	);
};

export default Footer;
