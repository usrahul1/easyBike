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

const HomePage: React.FC = () => {
	const [hover, setHover] = useState<boolean>(false);

	const textRef = useRef<HTMLDivElement | null>(null);
	const firstScreenRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = (): void => {
		const secondScreen = document.getElementById("secondScreen");
		if (secondScreen) {
			secondScreen.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		if (!textRef.current) return;

		const text = "RIDE NOW • RIDE NOW •";
		const textContainer = textRef.current;

		textContainer.innerHTML = "";

		text.split("").forEach((char, i) => {
			const span = document.createElement("span");
			span.textContent = char;
			span.setAttribute("data-idx", i.toString());
			textContainer.appendChild(span);
		});
	}, []);

	useEffect(() => {
		AOS.init({ duration: 1000 });
		AOS.refresh();
	}, []);

	return (
		<div className="min-h-screen">
			<div
				ref={firstScreenRef}
				id="6firstScreen"
				className="firstScreen bg-[#2F2F2F] w-full min-h-screen"
			>
				<div className="flex flex-col md:flex-row min-h-screen">
					<div className="flex flex-col justify-around md:flex-row h-[80vh] sm:h-screen w-screen">
						{/* Left side */}
						<div className="flex flex-col w-full md:w-1/2 md:h-full h-1/2 gap-5 items-center justify-center sm:justify-around bg-[#00d74f] sm:rounded-none md:rounded-r-[40%]">
							<nav className="px-4 py-2 flex gap-4">
								<button className="cursor-pointer">
									<InstagramIcon />
								</button>
								<button className="cursor-pointer">
									<Fb />
								</button>
							</nav>

							{/* Logo & Navigation */}
							<div className="logo h-fit flex flex-col md:flex-row justify-center items-center flex-wrap px-4">
								<div className="headlogo flex gap-4 items-center select-none mb-4 md:mb-0">
									<img
										data-aos="zoom-out"
										src={logo}
										className="w-16 sm:w-20 md:w-32 select-none cursor-pointer"
										alt="EasyBike Logo"
									/>

									<h1
										className="eB text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold uppercase text-black relative text-center break-words max-w-full whitespace-normal"
										onMouseEnter={() => {
											setHover(true);
											console.log(hover);
										}}
										onMouseLeave={() => setHover(false)}
										style={{ lineHeight: 1.1 }}
									>
										easyBike
										<span className="block">easyBike</span>
										<span className="block">easyBike</span>
										<span className="block">Ride. Share. Explore.</span>
									</h1>
								</div>

								<div className="flex flex-row sm:flex-row sm:ml-3 md:flex-col gap-4 items-center md:items-start">
									<h3
										data-aos="fade-right"
										className={`${styles.homeLink} flex gap-1 items-center cursor-pointer`}
									>
										<House />
										<span className="text-lg md:text-2xl">Home</span>
									</h3>
									<h3
										data-aos="fade-right"
										className={`${styles.rentBikesLink} flex gap-1 items-center cursor-pointer`}
									>
										<Bike />
										<span className="text-lg md:text-2xl">Rent Bikes</span>
									</h3>
									<h3
										data-aos="fade-left"
										className={`${styles.categoryLink} flex gap-1 items-center cursor-pointer`}
									>
										<UsersRound />
										<span className="text-lg md:text-2xl">About</span>
									</h3>
								</div>
							</div>

							<div className="scroll px-4 pb-4 hidden md:block">
								<button onClick={handleScroll}>
									<h3 className="flex gap-2 cursor-pointer text-black border-2 w-fit px-2 py-1 rounded-md font-medium select-none">
										<ArrowUp />
										Scroll Down
									</h3>
								</button>
							</div>
						</div>

						{/* Right side */}
						<div className="right flex items-center justify-center h-1/2 w-full md:w-1/2 md:h-full p-6 md:p-0 overflow-hidden ">
							<div className="login w-full flex items-center justify-center">
								<CircularText />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Second screen */}
			<div className="secondScreen bg-[#2F2F2F] max-w-screen min-h-screeb">
				<CarouselCard />
			</div>

			{/* Third screen */}
			<div className="thirdScreen bg-[#2F2F2F] py-8 px-4">
				<div className="w-full flex flex-col md:flex-row justify-center gap-6 items-center text-center md:text-left">
					<h1 className="text-white select-none text-2xl md:text-2xl">
						Ready to give us a try?
					</h1>
					<Link
						to="/login"
						className={`${styles.login} rounded-lg cursor-pointer px-5 py-2 bg-white text-black font-semibold`}
					>
						<span className="font-lg">Log In</span>
						<span className="font-space">Log In</span>
						<span className="font-rubik">Log In</span>
						<span className="font-eczr">Log In</span>
					</Link>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default HomePage;
