// import Sidebar2 from "../../../components/Sidebar/Sidebar2";
// import style from "./Support.module.css";
// import { useFirebase } from "../../../context/Firebase";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Support = () => {
// 	const firebase = useFirebase();
// 	const navigate = useNavigate();
// 	const [isExpanded, setIsExpanded] = useState(true);
// 	const [openSection, setOpenSection] = useState(null);

// 	const toggleSection = (sectionId) => {
// 		setOpenSection((prev) => (prev === sectionId ? null : sectionId));
// 	};

// 	const expand = () => {
// 		setIsExpanded((prev) => !prev);
// 	};
// 	useEffect(() => {
// 		if (!firebase.isLoggedIn) navigate("/login");
// 	}, [firebase, navigate]);
// 	return (
// 		<div className="flex min-h-screen">
// 			<Sidebar2 expand={expand} />
// 			<div
// 				className={`h-screen m-auto font-bold text-2xl flex-col transition-[margin] duration-300 ease-in-out ${
// 					isExpanded ? "ml-64" : "ml-20"
// 				} flex-1`}
// 			>
// 				<div
// 					className={`h-screen m-auto font-bold text-2xl flex items-center justify-center`}
// 				>
// 					<div className={`flex flex-col items-center`}>
// 						<div className={`${style.underline} cursor-pointer mb-6`}>
// 							<h2 className="text-3xl">Frequently Asked Questions</h2>
// 						</div>
// 						<main className={style.accordionContainer}>
// 							<section className={style.accordion} id="what-is-easybike">
// 								<h1 className={style.title}>
// 									<a
// 										href="#what-is-easybike"
// 										onClick={(e) => e.preventDefault()}
// 									>
// 										What is EasyBike?
// 									</a>
// 								</h1>
// 								<div className={style.content}>
// 									<div className={style.wrapper}>
// 										<p>
// 											EasyBike is a peer-to-peer bike-sharing platform designed
// 											for students. It helps you rent or lend bikes within your
// 											campus community.
// 										</p>
// 									</div>
// 								</div>
// 							</section>

// 							<section className={style.accordion} id="how-to-rent-bike">
// 								<h1 className={style.title}>
// 									<a
// 										href="#how-to-rent-bike"
// 										onClick={(e) => e.preventDefault()}
// 									>
// 										How do I rent a bike?
// 									</a>
// 								</h1>
// 								<div className={style.content}>
// 									<div className={style.wrapper}>
// 										<p>
// 											Log in, navigate to the "Dashboard" section, choose a
// 											bike, and click on 'Request'. Once the owner approves,
// 											you’re good to go!
// 										</p>
// 									</div>
// 								</div>
// 							</section>

// 							<section className={style.accordion} id="is-there-a-fee">
// 								<h1 className={style.title}>
// 									<a href="#is-there-a-fee">
// 										How is the rental fee calculated?
// 									</a>
// 								</h1>
// 								<div className={style.content}>
// 									<div className={style.wrapper}>
// 										<p>
// 											Bike owners share the amount for which they want to rent
// 											out, we here at easyBike team review their price and put
// 											out appropriate rental fee.
// 										</p>
// 									</div>
// 								</div>
// 							</section>

// 							<section className={style.accordion} id="can-i-cancel">
// 								<h1 className={style.title}>
// 									<a href="#can-i-cancel">Can I cancel my request?</a>
// 								</h1>
// 								<div className={style.content}>
// 									<div className={style.wrapper}>
// 										<p>
// 											Yes, you can cancel your request from the "Orders" page.
// 											If you cancel before the ride begins, you'll receive a
// 											full refund.
// 										</p>
// 									</div>
// 								</div>
// 							</section>

// 							<section className={style.accordion} id="is-my-data-safe">
// 								<h1 className={style.title}>
// 									<a href="#is-my-data-safe">Is my personal data safe?</a>
// 								</h1>
// 								<div className={style.content}>
// 									<div className={style.wrapper}>
// 										<p>
// 											Absolutely. We use secure authentication and encrypted
// 											storage to keep your information protected at all times.
// 										</p>
// 									</div>
// 								</div>
// 							</section>

// 							<section className={style.accordion} id="how-to-contact-support">
// 								<h1 className={style.title}>
// 									<a href="#how-to-contact-support">
// 										How can I contact support?
// 									</a>
// 								</h1>
// 								<div className={style.content}>
// 									<div className={style.wrapper}>
// 										<p>
// 											Visit our support page, and call us directly or fill in
// 											the form below. We typically reach out back to you in less
// 											then 2 business days.
// 										</p>
// 									</div>
// 								</div>
// 							</section>
// 						</main>
// 					</div>
// 				</div>

// 				<section
// 					id="contact"
// 					className={`${style.contactSection} border-2 border-black`}
// 				>
// 					<h1 className="section-header">Contact</h1>
// 					<div className="contact-wrapper flex">
// 						<form
// 							id="contact-form"
// 							className="form-horizontal border-2 border-black"
// 							role="form"
// 						>
// 							<div className="form-group">
// 								<div className="col-sm-12">
// 									<input
// 										type="text"
// 										className="form-control"
// 										id="name"
// 										placeholder="NAME"
// 										name="name"
// 										required
// 									/>
// 								</div>
// 							</div>

// 							<div className="form-group">
// 								<div className="col-sm-12">
// 									<input
// 										type="email"
// 										className="form-control"
// 										id="email"
// 										placeholder="EMAIL"
// 										name="email"
// 										required
// 									/>
// 								</div>
// 							</div>

// 							<textarea
// 								className="form-control"
// 								rows="10"
// 								placeholder="MESSAGE"
// 								name="message"
// 								required
// 							/>

// 							<button
// 								className="btn btn-primary send-button"
// 								id="submit"
// 								type="submit"
// 								value="SEND"
// 							>
// 								<div className="alt-send-button">
// 									<i className="fa fa-paper-plane"></i>
// 									<span className="send-text">SEND</span>
// 								</div>
// 							</button>
// 						</form>

// 						<div className="direct-contact-container">
// 							<ul className="contact-list">
// 								<li className="list-item">
// 									<i className="fa fa-map-marker fa-2x">
// 										<span className="contact-text place">City, State</span>
// 									</i>
// 								</li>
// 								<li className="list-item">
// 									<i className="fa fa-phone fa-2x">
// 										<span className="contact-text phone">
// 											<a href="tel:1-212-555-5555" title="Give me a call">
// 												(212) 555-2368
// 											</a>
// 										</span>
// 									</i>
// 								</li>
// 								<li className="list-item">
// 									<i className="fa fa-envelope fa-2x">
// 										<span className="contact-text gmail">
// 											<a href="mailto:#" title="Send me an email">
// 												hitmeup@gmail.com
// 											</a>
// 										</span>
// 									</i>
// 								</li>
// 							</ul>

// 							<hr />

// 							<ul className="social-media-list">
// 								<li>
// 									<a href="#" target="_blank" className="contact-icon">
// 										<i className="fa fa-github" aria-hidden="true"></i>
// 									</a>
// 								</li>
// 								{/* Add more social media links here */}
// 							</ul>

// 							<hr />
// 							<div className="copyright">&copy; ALL OF THE RIGHTS RESERVED</div>
// 						</div>
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	);
// };

// export default Support;

import Sidebar2 from "../../../components/Sidebar/Sidebar2";
import style from "./Support.module.css";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Support = () => {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(true);
	const [openSection, setOpenSection] = useState(null);

	const toggleSection = (sectionId) => {
		setOpenSection((prev) => (prev === sectionId ? null : sectionId));
	};

	const expand = () => {
		setIsExpanded((prev) => !prev);
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
			<Sidebar2 expand={expand} />
			<div
				className={`h-screen m-auto font-bold text-2xl flex-col transition-[margin] duration-300 ease-in-out ${
					isExpanded ? "ml-64" : "ml-20"
				} flex-1`}
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
									<h1 className={style.title}>
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
				<section className="border-2 border-black p-8 ">
					<h1
						className={`section-header text-3xl font-semibold text-center mb-8 ${style.underline}`}
					>
						Contact
					</h1>

					<div className="flex flex-col items-center md:flex-row gap-8">
						<form
							id="contact-form"
							className="form-horizontal border-2 border-black p-6 rounded-lg flex-1 shadow-lg"
							role="form"
						>
							<div className="form-group mb-6">
								<div className="col-sm-12">
									<input
										type="text"
										className="form-control w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
										id="name"
										placeholder="Name"
										name="name"
										required
									/>
								</div>
							</div>

							<div className="form-group mb-6">
								<div className="col-sm-12">
									<input
										type="email"
										className="form-control p-3 border-2 border-gray-300 rounded-lg focus:outline-none w-50"
										id="email"
										placeholder="Email"
										name="email"
										required
									/>
								</div>
							</div>

							<textarea
								className="form-control w-full p-3 resize-none border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2"
								placeholder="Message"
								name="message"
								required
							></textarea>

							<button
								className="btn btn-primary send-button w-full mt-6 py-3  rounded-lg flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-all"
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

						<div className="direct-contact-container flex-1">
							<ul className="contact-list space-y-4">
								<li className="list-item flex items-center gap-3 text-lg">
									<i className="fa fa-map-marker fa-2x text-gray-600"></i>
									<span className="contact-text place text-gray-700">
										City, State
									</span>
								</li>
								<li className="list-item flex items-center gap-3 text-lg">
									<i className="fa fa-phone fa-2x text-gray-600"></i>
									<span className="contact-text phone text-gray-700">
										<a href="tel:1-212-555-5555" className="hover:underline">
											{" "}
											(212) 555-2368{" "}
										</a>
									</span>
								</li>
								<li className="list-item flex items-center gap-3 text-lg">
									<i className="fa fa-envelope fa-2x text-gray-600"></i>
									<span className="contact-text gmail text-gray-700">
										<a href="mailto:#" className="hover:underline">
											{" "}
											hitmeup@gmail.com{" "}
										</a>
									</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Support;
