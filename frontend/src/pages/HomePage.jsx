import React from "react";
import logo from "../assets/easyBike.png";
import InstagramIcon from "../icons/Insta";
import Fb from "../icons/Fb";
import { House, ChartColumnStacked, Bike, ArrowLeft } from "lucide-react";

const HomePage = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-black h-screen">
			{/* Left side */}
			<div className="flex flex-col justify-between left bg-[#00d74f] rounded-r-[40%]">
				<nav className="px-2 py-2 pt-1 pb-1 flex gap-5 border-2 mt-2 border-black">
					<InstagramIcon />
					<Fb />
				</nav>
				<div className="logo flex justify-around items-center border-2 border-black">
					<div className="headlogo flex gap-5 items-center select-none">
						<img src={logo} className="w-30 select-none cursor-pointer" />
						<h1 className="font-eczar text-black text-5xl select-none cursor-pointer">
							easyBike
						</h1>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="flex gap-1 cursor-pointer">
							<House />
							Home
						</h3>
						<h3 className="flex gap-1 cursor-pointer">
							<ChartColumnStacked />
							Category
						</h3>
						<h3 className="flex gap-1 cursor-pointer">
							<Bike />
							Rent Bikes
						</h3>
					</div>
				</div>
				<div className="scroll">
					<h3 className="[writing-mode:vertical-rl] rotate-180 ml-2 flex gap-2 cursor-pointer text-white border-2 w-fit pl-2 pr-2 rounded-md">
						<ArrowUp />
						Scroll Down
					</h3>
				</div>
			</div>
			{/* Right side */}
			<div className="right">
				<div className="login">
					<button
						type="submit"
						className="px-2 py-2 pt-1 pb-1 mt-2 text-white cursor-pointer border-2 border-white rounded-lg"
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
