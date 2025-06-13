import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../../../assets/icons";
import CountryMap from "./CountryMap";

export default function DemographicCard(): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleDropdown = () => setIsOpen((prev) => !prev);
	const closeDropdown = () => setIsOpen(false);

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
			{/* Header */}
			<div className="flex justify-between">
				<div>
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
						Customers Demographic
					</h3>
					<p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
						Number of customers based on country
					</p>
				</div>
				<div className="relative inline-block">
					<button
						className="dropdown-toggle"
						onClick={toggleDropdown}
						aria-haspopup="true"
						aria-expanded={isOpen}
					>
						<MoreDotIcon className="size-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
					</button>

					<Dropdown
						isOpen={isOpen}
						onClose={closeDropdown}
						className="w-40 p-2"
					>
						<DropdownItem
							onItemClick={closeDropdown}
							className="flex w-full text-left font-normal text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
						>
							View More
						</DropdownItem>
						<DropdownItem
							onItemClick={closeDropdown}
							className="flex w-full text-left font-normal text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
						>
							Delete
						</DropdownItem>
					</Dropdown>
				</div>
			</div>

			{/* Map */}
			<div className="my-6 overflow-hidden rounded-2xl border border-gray-200 px-4 py-6 dark:border-gray-800 sm:px-6">
				<div
					id="mapOne"
					className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
				>
					<CountryMap />
				</div>
			</div>

			{/* Demographic Breakdown */}
			<div className="space-y-5">
				{[
					{
						name: "USA",
						customers: "2,379",
						percentage: 79,
						img: "./images/country/country-01.svg",
					},
					{
						name: "France",
						customers: "589",
						percentage: 23,
						img: "./images/country/country-02.svg",
					},
				].map(({ name, customers, percentage, img }) => (
					<div key={name} className="flex items-center justify-between">
						{/* Country Info */}
						<div className="flex items-center gap-3">
							<div className="max-w-8 w-full rounded-full">
								<img src={img} alt={name.toLowerCase()} />
							</div>
							<div>
								<p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
									{name}
								</p>
								<span className="block text-gray-500 text-theme-xs dark:text-gray-400">
									{customers} Customers
								</span>
							</div>
						</div>

						{/* Progress Bar */}
						<div className="flex w-full max-w-[140px] items-center gap-3">
							<div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
								<div
									className="absolute left-0 top-0 h-full rounded-sm bg-brand-500 text-xs font-medium text-white"
									style={{ width: `${percentage}%` }}
								></div>
							</div>
							<p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
								{percentage}%
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
