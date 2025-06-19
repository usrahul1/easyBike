import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFoundPage: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-6">
			<h1 className="text-7xl font-bold text-primary mb-4">404</h1>
			<p className="text-2xl font-semibold mb-2 text-error">Page Not Found</p>
			<p className="text-base-content text-lg mb-6">
				Sorry, we couldn't find what you're looking for.
			</p>
			<Link to="/" className="btn btn-outline btn-primary gap-2">
				<ArrowLeft className="w-4 h-4" />
				Back to Home
			</Link>
		</div>
	);
};

export default NotFoundPage;
