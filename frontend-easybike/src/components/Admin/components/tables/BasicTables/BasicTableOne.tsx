import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { deleteUser, getUserByUID } from "../../../../../fetch/fetch";
import ShowProfileModal from "../../modal/ShowProfileModal";

type FirebaseUser = {
	uid: string;
	email?: string;
	displayName?: string;
	photoURL?: string;
	metadata?: {
		creationTime: string;
	};
};

type BasicTableOneProps = {
	users: FirebaseUser[];
};

export default function BasicTableOne({
	users,
}: BasicTableOneProps): JSX.Element {
	const [loadingUID, setLoadingUID] = useState<string | null>(null);
	const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const handleRemoveUser = async (uid: string) => {
		if (!confirm("Are you sure you want to delete this user?")) return;

		try {
			setLoadingUID(uid);
			await deleteUser(uid);
			window.location.reload(); // Optionally replace with re-fetch
		} catch (err) {
			console.error("Failed to delete user:", err);
			alert("Failed to delete user.");
		} finally {
			setLoadingUID(null);
		}
	};

	const handleShowProfile = async (uid: string) => {
		try {
			const userData = await getUserByUID(uid);
			if (userData) {
				setSelectedProfile(userData);
				setIsProfileOpen(true);
			} else {
				alert("User profile not found.");
			}
		} catch (err) {
			console.error("Error fetching user profile:", err);
			alert("Failed to fetch profile.");
		}
	};

	return (
		<>
			<div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.02]">
				<div className="max-w-full overflow-x-auto">
					<Table>
						<TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
							<TableRow>
								{["User", "Joined At", "Show Profile", "Action"].map(
									(header) => (
										<TableCell
											key={header}
											isHeader
											className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
										>
											{header}
										</TableCell>
									)
								)}
							</TableRow>
						</TableHeader>

						<TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
							{users.map((user) => (
								<TableRow key={user.uid}>
									<TableCell className="px-5 py-4 text-start text-theme-sm dark:text-gray-400">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200">
												<img
													width={40}
													height={40}
													src={
														user.photoURL ||
														`https://ui-avatars.com/api/?name=${
															user.displayName || "User"
														}`
													}
													alt={user.displayName || "User"}
												/>
											</div>
											<div>
												<span className="block font-medium">
													{user.displayName || "No Name"}
												</span>
												<span className="block text-xs text-gray-500">
													{user.email || "—"}
												</span>
											</div>
										</div>
									</TableCell>

									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										{new Date(user.metadata?.creationTime || "").toDateString()}
									</TableCell>

									<TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
										<Button
											size="sm"
											variant="outline"
											onClick={() => handleShowProfile(user.uid)}
										>
											Show Profile
										</Button>
									</TableCell>

									<TableCell className="px-4 py-3 text-theme-sm dark:text-gray-400">
										<Button
											size="sm"
											variant="outline"
											startIcon={<Trash size={15} />}
											disabled={loadingUID === user.uid}
											onClick={() => handleRemoveUser(user.uid)}
										>
											{loadingUID === user.uid ? "Removing..." : "Remove User"}
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			{selectedProfile && (
				<ShowProfileModal
					isOpen={isProfileOpen}
					onClose={() => setIsProfileOpen(false)}
					profile={selectedProfile}
				/>
			)}
		</>
	);
}
