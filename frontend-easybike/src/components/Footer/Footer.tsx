import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
			<aside>
				<p>
					Copyright © {new Date().getFullYear()} - All right reserved by Sai
					Rahul Urumu
				</p>
			</aside>
		</footer>
	);
};

export default Footer;
