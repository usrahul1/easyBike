import { useState, useEffect } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router";
import { useFirebase } from "../../../../context/Firebase";
import avatar from "../../../../assets/avatar.png";
import { toast } from "react-hot-toast";
import { LogOut, UserPen } from "lucide-react";

interface UserProfile {
	name: string | null;
	email: string | null;
	photoURL?: string | null;
}

export default function UserDropdown(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [profilePic, setProfilePic] = useState<string>(avatar);
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const firebase = useFirebase();

	const toggleDropdown = () => setIsOpen((prev) => !prev);
	const closeDropdown = () => setIsOpen(false);

	useEffect(() => {
		const details = firebase.profDetails?.();
		if (details) {
			setProfile(details);
			if (details.photoURL) setProfilePic(details.photoURL);
		}
	}, [firebase]);

	const logOutHandler = () => {
		firebase.logOut?.();
		toast.success("Logged Out!");
	};

	return (
		<div className="relative">
			<button
				onClick={toggleDropdown}
				className="flex items-center dropdown-toggle"
			>
				<span className="mr-3 overflow-hidden rounded-full h-11 w-11">
					<img src={profilePic} alt="User" />
				</span>
				<span className="block mr-1 font-medium text-sm text-base-content">
					{profile?.name || "Loading..."}
				</span>
				<svg
					className={`stroke-base-content transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
					width="18"
					height="20"
					viewBox="0 0 18 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<Dropdown
				isOpen={isOpen}
				onClose={closeDropdown}
				className="absolute right-0 mt-4 w-[260px] rounded-2xl border border-base-200 bg-base-100 p-3 shadow-lg"
			>
				<div>
					<span className="block font-semibold text-sm text-base-content">
						{profile?.name || "Loading..."}
					</span>
					<span className="mt-0.5 block text-xs text-base-content/60 truncate">
						{profile?.email || "Loading..."}
					</span>
				</div>

				<ul className="flex flex-col gap-1 pt-4 pb-3">
					<li>
						<DropdownItem
							onItemClick={closeDropdown}
							tag="a"
							to="/settings"
							className="flex items-center gap-3 px-3 py-2 font-medium rounded-lg text-sm text-base-content hover:bg-base-200 transition-colors"
						>
							<UserPen />
							Profile
						</DropdownItem>
					</li>
				</ul>

				<button
					onClick={logOutHandler}
					className="flex items-center gap-3 px-3 py-2 font-medium rounded-lg text-sm text-error hover:bg-error/10 hover:text-error cursor-pointer"
				>
					<LogOut size={18} />
					Sign out
				</button>
			</Dropdown>
		</div>
	);
}
