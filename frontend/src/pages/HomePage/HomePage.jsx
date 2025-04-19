import { useEffect, useState, useRef } from "react";
import logo from "../../assets/easyBike.png";
import InstagramIcon from "../../icons/Insta";
import Fb from "../../icons/Fb";
import { House, Bike, ArrowUp, UsersRound } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./HomePage.module.css";
import CircularText from "../../components/CircularText/CircularText";
import CarouselCard from "../../components/CarouselCards/CarouselCard";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [hover, setHover] = useState(false);
	const textRef = useRef(null);
	const firstScreenRef = useRef(null);

	const handleScroll = () => {
		document
			.getElementById("secondScreen")
			.scrollIntoView({ behavior: "smooth" });
	};

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
			<div
				ref={firstScreenRef}
				id="6firstScreen"
				className="firstScreen bg-[#2F2F2F] w-full"
			>
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
									className={`${styles.homeLink} flex gap-1 cursor-pointer items-center`}
								>
									<House />
									<span className="text-2xl">Home</span>
								</h3>
								<h3
									data-aos="fade-right"
									className={`${styles.rentBikesLink} flex gap-1 cursor-pointer items-center`}
								>
									<Bike />
									<span className="text-2xl">Rent Bikes</span>
								</h3>
								<h3
									data-aos="fade-left"
									className={`${styles.categoryLink} flex gap-1 cursor-pointer items-center`}
								>
									<UsersRound />
									<span className="text-2xl">About</span>
								</h3>
							</div>
						</div>

						{/* Scroll Indicator */}
						<div className="scroll">
							<button onClick={handleScroll}>
								<h3 className="[writing-mode:vertical-rl] rotate-180 ml-2 flex gap-2 cursor-pointer text-black border-2 w-fit px-2 py-1 mb-1 rounded-md font-medium">
									<ArrowUp />
									Scroll Down
								</h3>
							</button>
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
				<div id="secondScreen" className="secondScreen w-full"></div>
			</div>
			<div className="secondScreen bg-[#2F2F2F] h-full w-full">
				<CarouselCard />
			</div>
			<div className="thirdScreen bg-[#2F2F2F]">
				<div className="w-full flex justify-center gap-5 pb-5 text-xl items-center">
					<h1 className="text-white select-none text-3xl">
						Ready to give us a try?
					</h1>
					<Link
						to="/login"
						className={`${styles.login} rounded-lg cursor-pointer`}
					>
						<span className="font-lg">Log In</span>
						<span className="font-space">Log In</span>
						<span className="font-rubik">Log In</span>
						<span className="font-eczr">Log In</span>
					</Link>
				</div>
			</div>
			<Footer firstScreenRef={firstScreenRef} />
		</>
	);
};

export default HomePage;
