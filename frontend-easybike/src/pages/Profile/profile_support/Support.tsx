import style from "./Support.module.css";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Type for FAQ items
interface FAQ {
	id: string;
	question: string;
	answer: string;
}

const Support: React.FC = () => {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const [openSection, setOpenSection] = useState<string | null>(null);
	const firstScreenRef = useRef<HTMLDivElement | null>(null);

	const toggleSection = (sectionId: string) => {
		setOpenSection((prev) => (prev === sectionId ? null : sectionId));
	};

	useEffect(() => {
		if (!firebase.isLoggedIn) navigate("/login");
	}, [firebase.isLoggedIn, navigate]);

	const faqs: FAQ[] = [
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
		<div className="flex flex-col flex-grow">
			<motion.div
				className="h-screen m-auto font-bold text-2xl flex-col flex-1"
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
									} bg-base-200 shadow-2xl hover:bg-base-300 hover:shadow-xl transition-all duration-300 ease-in-out`}
								>
									<h1 className={`${style.title}`}>
										<a
											href="#!"
											onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
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
				<section className="p-8 flex flex-col flex-grow">
					<center>
						<h1
							className={`section-header text-3xl font-semibold mb-8 select-none cursor-pointer ${style.underline}`}
						>
							Contact
						</h1>
					</center>

					<div className="flex justify-center items-center gap-6">
						<form
							className="p-6 flex flex-col bg-base-200 gap-2 rounded-lg shadow-2xl min-w-lg"
							onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
								e.preventDefault();
								// Add your form submission logic here
							}}
						>
							<input
								type="text"
								className="p-3 border-2 rounded-lg focus:outline-none"
								placeholder="Name"
								name="name"
								required
							/>

							<input
								type="email"
								className="p-3 border-2 rounded-lg focus:outline-none"
								placeholder="Email"
								name="email"
								required
							/>

							<textarea
								className="p-3 resize-none border-2 rounded-lg focus:outline-none"
								placeholder="Message"
								name="message"
								required
							></textarea>

							<button
								className="w-fit p-2 mt-6 m-auto py-3 rounded-lg flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-all"
								id="submit"
								type="submit"
							>
								<div className="alt-send-button flex items-center gap-2">
									<i className="fa fa-paper-plane"></i>
									<span className="send-text">SEND</span>
								</div>
							</button>
						</form>

						<div className="flex p-4 bg-base-200 rounded-lg">
							<ul className="contact-list space-y-4">
								<li className="flex items-center gap-3 text-lg">
									<i className="fa fa-map-marker fa-2x "></i>
									<span className="contact-text place  select-none">
										Visakhapatnam, India
									</span>
								</li>
								<li className="flex items-center gap-3 text-lg">
									<i className="fa fa-phone fa-2x "></i>
									<span className="contact-text phone ">
										<a href="tel:1-212-555-5555" className="hover:underline">
											63038-83383
										</a>
									</span>
								</li>
								<li className="flex items-center gap-3 text-lg">
									<i className="fa fa-envelope fa-2x"></i>
									<span className="contact-text gmail">
										<a
											href="mailto:sairahulurumu@gmail.com"
											className="hover:underline"
										>
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
