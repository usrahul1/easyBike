import { useEffect, useState, useRef } from "react";
import logo from "../../assets/easyBike.png";
import InstagramIcon from "../../icons/Insta";
import Fb from "../../icons/Fb";
import { House, ChartColumnStacked, Bike, ArrowUp } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./HomePage.module.css";
import CircularText from "../../components/CircularText/CircularText";

const HomePage = () => {
	const [hover, setHover] = useState(false);
	const textRef = useRef(null);

	useEffect(() => {
		if (!textRef.current) return;

		const text = "RIDE NOW • RIDE NOW •";
		const textContainer = textRef.current;

		textContainer.innerHTML = "";

		text.split("").forEach((char, i) => {
			const span = document.createElement("span");
			span.textContent = char;
			span.setAttribute("data-idx", i);
			textContainer.appendChild(span);
		});
	}, []);

	useEffect(() => {
		AOS.init({ duration: 1000 });
		AOS.refresh();
	}, []);

	return (
		<>
			<div className="firstScreen w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4  h-screen">
					{/* Left side */}
					<div className="flex flex-col justify-between bg-[#00d74f] rounded-r-[40%]">
						<nav className="px-2 py-2 flex gap-5  ml-4 mt-4">
							<button className="cursor-pointer">
								<InstagramIcon />
							</button>
							<button className="cursor-pointer">
								<Fb />
							</button>
						</nav>

						{/* Logo & Navigation */}
						<div className="logo h-fit flex justify-around items-center ">
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
									<span className="">easyBike</span>
									<span>Ride. Share. Explore.</span>
								</h1>
							</div>

							{/* Navigation Links */}
							<div className="flex flex-col gap-5">
								<h3
									data-aos="fade-right"
									className={`${styles.homeLink} flex gap-1 cursor-pointer`}
								>
									<House />
									<span>Home</span>
								</h3>
								<h3
									data-aos="fade-left"
									className={`${styles.categoryLink} flex gap-1 cursor-pointer`}
								>
									<ChartColumnStacked />
									<span>Category</span>
								</h3>
								<h3
									data-aos="fade-right"
									className={`${styles.rentBikesLink} flex gap-1 cursor-pointer`}
								>
									<Bike />
									<span>Rent Bikes</span>
								</h3>
							</div>
						</div>

						{/* Scroll Indicator */}
						<div className="scroll">
							<h3 className="[writing-mode:vertical-rl] rotate-180 ml-2 flex gap-2 cursor-pointer text-black border-2 w-fit px-2 py-1 mb-1 rounded-md font-medium">
								<ArrowUp />
								Scroll Down
							</h3>
						</div>
					</div>

					{/* Right side */}
					<div className="right flex items-center justify-center">
						<div className="login rounded-[100%]">
							<CircularText />
						</div>
					</div>
				</div>

				{/* Second Screen */}
				<div className="secondScreen w-full"></div>
			</div>
			<div className="secondScreen h-screen w-full"></div>
		</>
	);
};

export default HomePage;
