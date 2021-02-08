import React from "react";

export const StepLayout = ({ children }) => {
	return (
		<div className="flex-1 flex items-center justify-center">
			<div className="p-8 rounded shadow-lg bg-white w-1/2">{children}</div>
		</div>
	);
};
