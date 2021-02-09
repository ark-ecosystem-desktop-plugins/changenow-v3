import React, { useEffect, useRef } from "react";
import { SearchIcon } from "../icons/SearchIcon";

const { Components } = globalThis.ark;
const { Box } = Components;

export const Listbox = ({ isOpen, options, search, onSearch, onSelect }) => {
	const inputRef = useRef();

	useEffect(() => {
		if (isOpen) {
			inputRef.current.focus();
		}
	}, [isOpen, inputRef]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="absolute right-1 top-16 shadow-lg z-50 bg-white rounded text-black w-64">
			<div className="relative">
				<div className="group sticky top-0 px-4 shadow">
					<div className="flex">
						<label htmlFor="search-input" className="flex-none pr-3 flex items-center">
							<SearchIcon className="text-theme-secondary-400 group-focus-within:text-theme-secondary-500 transition-colors duration-150 w-5 h-5" />
						</label>
						<input
							ref={inputRef}
							type="text"
							id="search-input"
							className="flex-auto pl-0 py-4 text-base leading-6 text-theme-secondary-text placeholder-theme-secondary-500 focus:outline-none focus:placeholder-theme-secondary-400 focus:ring-0 border-0"
							value={search}
							onChange={(evt) => onSearch?.(evt.target.value)}
						/>
					</div>
				</div>

				<Box as="ul" className="flex flex-col overflow-y-auto py-1" styled={{ maxHeight: "200px" }}>
					{options.map((option) => (
						<li key={option.ticker}>
							<Box
								as="button"
								type="button"
								className="w-full flex space-x-2 px-4 py-1 text-xs transition duration-100 hover:bg-theme-secondary-200"
								onClick={() => onSelect?.(option)}
							>
								<div className="w-6 flex items-center justifiy-center">
									<img src={option.image} className="w-4" />
								</div>
								<div className="w-14 text-theme-text uppercase font-medium text-left">
									{option.ticker}
								</div>
								<div className="flex-1 truncate text-theme-secondary-text">{option.name}</div>
							</Box>
						</li>
					))}
				</Box>
			</div>
		</div>
	);
};
