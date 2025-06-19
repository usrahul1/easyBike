import { X } from "lucide-react";

export default function ShowDocsModal({
	docs,
	onClose,
}: {
	docs: { label: string; url: string }[];
	onClose: () => void;
}) {
	return (
		<div className="fixed inset-0 z-50 bg-base-200 bg-opacity-70 flex items-center justify-center pt-14">
			{/* Modal container */}
			<div className="relative bg-base-100 rounded-xl shadow-xl w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto p-6">
				{/* Close button */}
				<button
					className="absolute top-4 right-4 text-base-content hover:text-error"
					onClick={onClose}
				>
					<X size={24} />
				</button>

				{/* Title */}
				<h2 className="text-2xl font-bold mb-4 text-base-content">
					Bike Documents
				</h2>

				{/* Document list */}
				<div className="space-y-6">
					{docs.map((doc, index) => (
						<div key={index} className="border border-base-300 p-4 rounded-lg">
							<h4 className="font-semibold mb-2 text-base-content">
								{doc.label}
							</h4>

							{doc.url.endsWith(".pdf") ? (
								<iframe
									src={doc.url}
									width="100%"
									height="500px"
									className="border border-base-300 rounded-md"
								/>
							) : (
								<img
									src={doc.url}
									alt={doc.label}
									className="max-w-full h-auto rounded-md border border-base-300"
								/>
							)}

							<a
								href={doc.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline mt-2 block"
							>
								Open in new tab
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
