import React from "react";
import { InputConvert } from "../components/InputConvert";

const { Components } = globalThis.ark;
const { Box } = Components;

export const FormStep = ({ state, dispatch, onSubmit }) => {
	const { estimatedAmount } = state;

	return (
		<form
			onSubmit={(evt) => {
				evt.preventDefault();
				onSubmit?.();
			}}
		>
			<InputConvert state={state} dispatch={dispatch} />

			<Box
				as="button"
				type="submit"
				className="w-full rounded p-3 text-lg mt-8 font-semibold bg-white"
				styled={{ background: "#3bee81" }}
				disabled={!estimatedAmount}
			>
				Exchange
			</Box>
		</form>
	);
};
