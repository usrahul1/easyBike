// components/modal/ShowProfileModal.tsx
import { X } from "lucide-react";

interface ShowProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
	profile: {
		uid: string;
		email: string;
		emailVerified: boolean;
		displayName: string;
		photoURL: string;
		disabled: boolean;
		metadata: {
			lastSignInTime: string;
			creationTime: string;
			lastRefreshTime?: string;
		};
		tokensValidAfterTime: string;
		providerData: {
			uid: string;
			displayName: string;
			email: string;
			photoURL: string;
			providerId: string;
		}[];
	} | null;
}

export default function ShowProfileModal({
	isOpen,
	onClose,
	profile,
}: ShowProfileModalProps) {
	if (!isOpen || !profile) return null;

	return (
		<div className="fixed inset-0 z-50 bg-base-200 bg-opacity-70 flex items-center justify-center pt-14">
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
					User Profile
				</h2>

				{/* Profile photo */}
				<div className="flex justify-center mb-6">
					<img
						src={profile.photoURL || "/default-user.png"}
						alt="User"
						className="w-24 h-24 rounded-full border border-base-300"
					/>
				</div>

				{/* Profile details */}
				<div className="space-y-2 text-base-content">
					<p>
						<strong>UID:</strong> {profile.uid}
					</p>
					<p>
						<strong>Name:</strong> {profile.displayName}
					</p>
					<p>
						<strong>Email:</strong> {profile.email}
					</p>
					<p>
						<strong>Email Verified:</strong>{" "}
						{profile.emailVerified ? "Yes" : "No"}
					</p>
					<p>
						<strong>Account Disabled:</strong> {profile.disabled ? "Yes" : "No"}
					</p>
					<p>
						<strong>Created At:</strong> {profile.metadata.creationTime}
					</p>
					<p>
						<strong>Last Sign-In:</strong> {profile.metadata.lastSignInTime}
					</p>
					{profile.metadata.lastRefreshTime && (
						<p>
							<strong>Last Refresh:</strong> {profile.metadata.lastRefreshTime}
						</p>
					)}
					<p>
						<strong>Tokens Valid After:</strong> {profile.tokensValidAfterTime}
					</p>
				</div>

				{/* Provider Info */}
				<div className="mt-6">
					<h3 className="text-lg font-semibold text-base-content mb-2">
						Provider Info:
					</h3>
					{profile.providerData.map((provider, index) => (
						<div
							key={index}
							className="mb-4 p-4 border border-base-300 rounded-md text-base-content"
						>
							<p>
								<strong>Provider ID:</strong> {provider.providerId}
							</p>
							<p>
								<strong>Name:</strong> {provider.displayName}
							</p>
							<p>
								<strong>Email:</strong> {provider.email}
							</p>
							<p>
								<strong>UID:</strong> {provider.uid}
							</p>
							{provider.photoURL && (
								<img
									src={provider.photoURL}
									alt="Provider"
									className="w-12 h-12 rounded-full mt-2 border border-base-300"
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
