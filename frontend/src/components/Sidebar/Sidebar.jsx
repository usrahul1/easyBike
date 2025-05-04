import { ChevronFirst, MoreVertical, User, ChevronLast } from "lucide-react";
import React, { useState, createContext, useContext } from "react";
import { useFirebase } from "../../context/Firebase";

export const SidebarContext = createContext();

const Sidebar = ({ children, expand }) => {
	const firebase = useFirebase();
	const [expanded, setExpanded] = useState(true);
	const [verticalExpanded, setVerticalExpanded] = useState(false);
	// const { expanded, setExpanded } = useContext(SidebarContext);

	return (
		<SidebarContext.Provider value={{ expanded, setExpanded }}>
			<aside className="h-screen max-w-fit fixed">
				<nav className="h-full flex flex-col bg-white border-r shadow-sm max-w-fit">
					<div className={`p-4 pb-2 flex justify-between items-center`}>
						<h2 className={`${expanded ? "text-xl select-none" : "hidden"}`}>
							easyBike
						</h2>
						<button
							onClick={() => {
								setExpanded((prev) => !prev);
								expand();
							}}
							className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
						>
							{expanded ? <ChevronFirst /> : <ChevronLast />}
						</button>
					</div>

					<ul className="flex-1 px-3"> {children}</ul>

					{verticalExpanded ? (
						<div className="">
							<ul className="">
								<li>
									<button>Profile</button>
								</li>
								<li>
									<button onClick={firebase.logOut} className="border-black">
										Logout
									</button>
								</li>
							</ul>
						</div>
					) : (
						""
					)}
					<div className="border-t flex p-3">
						<User
							src="https://via.placeholder.com/40"
							className={`h-10 rounded-md cursor-pointer ${
								expanded ? "w-8" : "w-8"
							}`}
							alt="User"
						/>

						<div
							className={`flex justify-between items-center ${
								expanded ? "w-52" : "max-w-fit"
							} ml-3`}
						>
							<div className="leading-4">
								<h4 className="font-semibold">{expanded ? "John Doe" : ""}</h4>
								<span className="text-xs text-gray-600">
									{expanded ? "johndoe@gmail.com" : ""}
								</span>
							</div>

							{expanded ? (
								<button
									onClick={() => setVerticalExpanded((prev) => !prev)}
									className="cursor-pointer"
								>
									<MoreVertical size={20} />
								</button>
							) : (
								""
							)}
						</div>
					</div>
				</nav>
			</aside>
		</SidebarContext.Provider>
	);
};

export default Sidebar;
