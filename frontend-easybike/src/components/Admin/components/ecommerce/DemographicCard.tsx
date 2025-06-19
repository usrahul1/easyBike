import { useState, useEffect } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../../../assets/icons";
import CountryMap from "./CountryMap";
import { getCustomerDemographics } from "../../../../fetch/fetch";
import type { DemographicData } from "../../../../Types/types";

export default function DemographicCard(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [demographics, setDemographics] = useState<DemographicData[]>([]);

	const toggleDropdown = () => setIsOpen((prev) => !prev);
	const closeDropdown = () => setIsOpen(false);

	useEffect(() => {
		const fetchDemographics = async () => {
			try {
				const data = await getCustomerDemographics();
				setDemographics(data);
			} catch (err) {
				console.error("Failed to fetch demographic data", err);
			}
		};

		fetchDemographics();
	}, []);

	return (
		<div className="rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6">
			{/* Header */}
			<div className="flex justify-between items-start">
				<div>
					<h3 className="text-lg font-semibold text-base-content">
						Customers Demographic
					</h3>
					<p className="mt-1 text-sm text-base-content/70">
						Number of customers based on country
					</p>
				</div>
				<div className="relative inline-block">
					<button
						className="btn btn-sm btn-ghost"
						onClick={toggleDropdown}
						aria-haspopup="true"
						aria-expanded={isOpen}
					>
						<MoreDotIcon className="size-6 text-base-content/60" />
					</button>

					<Dropdown
						isOpen={isOpen}
						onClose={closeDropdown}
						className="w-40 p-2"
					>
						<DropdownItem
							onItemClick={closeDropdown}
							className="text-sm text-base-content hover:bg-base-200"
						>
							View More
						</DropdownItem>
						<DropdownItem
							onItemClick={closeDropdown}
							className="text-sm text-base-content hover:bg-base-200"
						>
							Delete
						</DropdownItem>
					</Dropdown>
				</div>
			</div>

			{/* Map Section */}
			<div className="my-6 overflow-hidden rounded-xl border border-base-300 px-4 py-6 sm:px-6">
				<div
					id="mapOne"
					className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
				>
					<CountryMap />
				</div>
			</div>

			{/* Demographics List */}
			<div className="space-y-5">
				{demographics.map(({ country, count }) => {
					const total = demographics.reduce((sum, d) => sum + d.count, 0);
					const percentage =
						total === 0 ? 0 : Math.round((count / total) * 100);
					const imgPath = `/images/country/${country.toLowerCase()}.svg`;

					return (
						<div key={country} className="flex items-center justify-between">
							{/* Country Info */}
							<div className="flex items-center gap-3">
								<div className="w-8 rounded-full">
									<img src={imgPath} alt={country.toLowerCase()} />
								</div>
								<div>
									<p className="font-medium text-base-content">{country}</p>
									<p className="text-xs text-base-content/70">
										{count.toLocaleString()} Customers
									</p>
								</div>
							</div>

							{/* Progress Bar */}
							<div className="flex w-full max-w-[140px] items-center gap-3">
								<div className="relative block h-2 w-full max-w-[100px] rounded bg-base-300">
									<div
										className="absolute left-0 top-0 h-full rounded bg-primary"
										style={{ width: `${percentage}%` }}
									/>
								</div>
								<p className="text-sm font-medium text-base-content">
									{percentage}%
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
