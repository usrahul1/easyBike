import Sidebar2 from "../../../components/Sidebar/Sidebar2";
import style from "./Support.module.css";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import { motion } from "framer-motion";

const Support = () => {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const [openSection, setOpenSection] = useState(null);
	const firstScreenRef = useRef(null);

	const toggleSection = (sectionId) => {
		setOpenSection((prev) => (prev === sectionId ? null : sectionId));
	};

	useEffect(() => {
		if (!firebase.isLoggedIn) navigate("/login");
	}, [firebase, navigate]);

	const faqs = [
		{
			id: "what-is-easybike",
			question: "What is EasyBike?",
			answer:
				"EasyBike is a peer-to-peer bike-sharing platform designed for students. It helps you rent or lend bikes within your campus community.",
		},
		{
			id: "how-to-rent-bike",
			question: "How do I rent a bike?",
			answer:
				'Log in, navigate to the "Dashboard" section, choose a bike, and click on "Request". Once the owner approves, you’re good to go!',
		},
		{
			id: "is-there-a-fee",
			question: "How is the rental fee calculated?",
			answer:
				"Bike owners share the amount for which they want to rent out, and the EasyBike team reviews and finalizes the appropriate rental fee.",
		},
		{
			id: "can-i-cancel",
			question: "Can I cancel my request?",
			answer:
				'Yes, you can cancel your request from the "Orders" page. If you cancel before the ride begins, you\'ll receive a full refund.',
		},
		{
			id: "is-my-data-safe",
			question: "Is my personal data safe?",
			answer:
				"Absolutely. We use secure authentication and encrypted storage to keep your information protected at all times.",
		},
		{
			id: "how-to-contact-support",
			question: "How can I contact support?",
			answer:
				"Visit our support page, and call us directly or fill in the form below. We typically reach out back to you in less than 2 business days.",
		},
	];

	return (
		<div className="flex min-h-screen">
			<motion.div
				className={`h-screen m-auto font-bold text-2xl flex-col flex-1`}
				ref={firstScreenRef}
			>
				<div className="h-screen m-auto font-bold text-2xl flex items-center justify-center">
					<div className="flex flex-col items-center">
						<div className={`${style.underline} cursor-pointer mb-6`}>
							<h2 className="text-3xl">Frequently Asked Questions</h2>
						</div>

						<main className={style.accordionContainer}>
							{faqs.map((faq) => (
								<section
									key={faq.id}
									className={`${style.accordion} ${
										openSection === faq.id ? style.open : ""
									}`}
								>
									<h1 className={`${style.title} hover:bg-gray-300`}>
										<a
											href="#!"
											onClick={(e) => {
												e.preventDefault();
												toggleSection(faq.id);
											}}
										>
											{faq.question}
										</a>
									</h1>
									{openSection === faq.id && (
										<div className={style.content}>
											<div className={style.wrapper}>
												<p>{faq.answer}</p>
											</div>
										</div>
									)}
								</section>
							))}
						</main>
					</div>
				</div>

				{/* Contact Section */}
				<section className="p-8 ">
					<center>
						<h1
							className={`section-header text-3xl font-semibold mb-8 select-none cursor-pointer ${style.underline}`}
						>
							Contact
						</h1>
					</center>

					<div className="flex justify-center items-center gap-6">
						<form className="p-6 flex flex-col gap-2 rounded-lg shadow-2xl min-w-lg">
							<input
								type="text"
								className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
								placeholder="Name"
								name="name"
								required
							/>

							<input
								type="email"
								className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
								placeholder="Email"
								name="email"
								required
							/>

							<textarea
								className="p-3 resize-none border-2 border-gray-300 rounded-lg focus:outline-none"
								placeholder="Message"
								name="message"
								required
							></textarea>

							<button
								className="w-fit p-2 mt-6 m-auto py-3 rounded-lg flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-all"
								id="submit"
								type="submit"
								value="SEND"
							>
								<div className="alt-send-button flex items-center gap-2">
									<i className="fa fa-paper-plane"></i>
									<span className="send-text">SEND</span>
								</div>
							</button>
						</form>

						<div className="flex p-4">
							<ul className="contact-list space-y-4">
								<li className="flex items-center gap-3 text-lg">
									<i className="fa fa-map-marker fa-2x text-gray-600"></i>
									<span className="contact-text place text-gray-700 select-none">
										Visakhapatnam, India
									</span>
								</li>
								<li className="flex items-center gap-3 text-lg">
									<i className="fa fa-phone fa-2x text-gray-600"></i>
									<span className="contact-text phone text-gray-700">
										<a href="tel:1-212-555-5555" className="hover:underline">
											63038-83383
										</a>
									</span>
								</li>
								<li className="flex items-center gap-3 text-lg">
									<i className="fa fa-envelope fa-2x text-gray-600"></i>
									<span className="contact-text gmail text-gray-700">
										<a href="mailto:#" className="hover:underline">
											sairahulurumu@gmail.com
										</a>
									</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</motion.div>
		</div>
	);
};

export default Support;
