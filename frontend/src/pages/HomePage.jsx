import { useEffect, useState } from "react";
import logo from "../assets/easyBike.png";
import InstagramIcon from "../icons/Insta";
import Fb from "../icons/Fb";
import { House, ChartColumnStacked, Bike, ArrowUp } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
	const [hover, setHover] = useState(false);

	useEffect(() => {
		AOS.init({ duration: 1000 });
		AOS.refresh(); // Ensure animations are updated
	}, []);

	return (
		<div className="firstScreen w-full">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-black h-screen">
				{/* Left side */}
				<div className="flex flex-col justify-between bg-[#00d74f] rounded-r-[40%]">
					<nav className="px-2 py-2 flex gap-5 border-2 mt-2 border-black">
						<InstagramIcon />
						<Fb />
					</nav>

					{/* Logo & Navigation */}
					<div className="logo flex justify-around items-center border-2 border-black">
						<div className="headlogo flex gap-5 items-center select-none">
							<img
								data-aos="zoom-out"
								src={logo}
								className="w-30 select-none cursor-pointer"
								alt="EasyBike Logo"
							/>

							{/* Animated Heading */}
							<h1
								className="eB text-6xl font-bold uppercase text-black relative"
								onMouseEnter={() => setHover(true)}
								onMouseLeave={() => setHover(false)}
							>
								easyBike
								<span className="">easyBike</span>
								<span>easyBike</span>
								<span>Ride. Share. Explore.</span>
							</h1>
						</div>

						{/* Navigation Links */}
						<div className="flex flex-col gap-4">
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

					{/* Scroll Indicator */}
					<div className="scroll">
						<h3 className="[writing-mode:vertical-rl] rotate-180 ml-2 flex gap-2 cursor-pointer text-white border-2 w-fit px-2 py-1 mb-1 rounded-md">
							<ArrowUp />
							Scroll Down
						</h3>
					</div>
				</div>

				{/* Right side */}
				<div className="right flex items-center justify-center">
					<div className="login">
						<button
							type="submit"
							className="px-4 py-2 mt-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition"
						>
							Login
						</button>
					</div>
				</div>
			</div>

			{/* Second Screen */}
			<div className="secondScreen w-full"></div>
		</div>
	);
};

export default HomePage;
