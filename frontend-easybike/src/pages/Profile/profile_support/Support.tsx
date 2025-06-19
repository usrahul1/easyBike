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
			<motion.div className="min-h-screen flex flex-col" ref={firstScreenRef}>
				{/* FAQ Section */}
				<div className="flex flex-col items-center justify-center px-4 py-10">
					<div className={`${style.underline} cursor-pointer mb-6`}>
						<h2 className="text-3xl sm:text-4xl text-center font-bold text-base-content">
							Frequently Asked Questions
						</h2>
					</div>

					<main className={`w-full max-w-4xl ${style.accordionContainer}`}>
						{faqs.map((faq) => (
							<section
								key={faq.id}
								className={`${style.accordion} ${
									openSection === faq.id ? style.open : ""
								} bg-base-200 hover:bg-base-300 transition-all duration-300 ease-in-out mb-4 rounded-lg shadow`}
							>
								<h1 className={style.title}>
									<a
										href="#!"
										className="text-base-content"
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
											<p className="text-base-content">{faq.answer}</p>
										</div>
									</div>
								)}
							</section>
						))}
					</main>
				</div>

				{/* Contact Section */}
				<section className="w-full px-4 py-10 bg-base-100">
					<div className="text-center mb-8">
						<h1
							className={`text-3xl font-semibold select-none cursor-pointer text-base-content ${style.underline}`}
						>
							Contact
						</h1>
					</div>

					<div className="flex flex-col lg:flex-row items-center justify-center gap-8">
						{/* Contact Form */}
						<form
							className="w-full max-w-md p-6 bg-base-200 rounded-lg shadow flex flex-col gap-4"
							onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
								e.preventDefault();
								// submission logic
							}}
						>
							<input
								type="text"
								className="input input-bordered w-full"
								placeholder="Name"
								name="name"
								required
							/>
							<input
								type="email"
								className="input input-bordered w-full"
								placeholder="Email"
								name="email"
								required
							/>
							<textarea
								className="textarea textarea-bordered w-full resize-none"
								placeholder="Message"
								name="message"
								required
							></textarea>

							<button
								className="btn btn-primary mt-2 self-center"
								type="submit"
							>
								<i className="fa fa-paper-plane mr-2"></i>
								SEND
							</button>
						</form>

						{/* Contact Info */}
						<div className="w-full max-w-md p-6 bg-base-200 rounded-lg shadow">
							<ul className="space-y-6 text-base-content">
								<li className="flex items-center gap-4 text-lg">
									<i className="fa fa-map-marker fa-2x"></i>
									<span className="select-none">Visakhapatnam, India</span>
								</li>
								<li className="flex items-center gap-4 text-lg">
									<i className="fa fa-phone fa-2x"></i>
									<a href="tel:6303883383" className="hover:underline">
										63038-83383
									</a>
								</li>
								<li className="flex items-center gap-4 text-lg">
									<i className="fa fa-envelope fa-2x"></i>
									<a
										href="mailto:sairahulurumu@gmail.com"
										className="hover:underline"
									>
										sairahulurumu@gmail.com
									</a>
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
