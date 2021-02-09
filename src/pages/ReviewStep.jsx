import React from "react";
import { useExchange } from "../hooks/use-exchange";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";

const { Components } = globalThis.ark;
const { Box, Spinner, Checkbox } = Components;

import { validateAddress } from "../utils/validators";

export const ReviewStep = ({ state, dispatch, onConfirm, onBack }) => {
	const { createTransaction } = useExchange();
	const { amount, estimatedAmount, recipient, from, to, transactionSpeedForecast } = state;
	const [isTermsChecked, setIsTermsChecked] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const unitPrice = React.useMemo(() => Number(estimatedAmount / amount).toFixed(7), [estimatedAmount, amount]);

	const isValid = isTermsChecked && recipient && amount && from && to;

	const createExchange = async () => {
		setIsLoading(true);
		try {
			const params = {
				from: state.from.ticker,
				to: state.to.ticker,
				address: state.recipient,
				amount: state.amount,
			};

			if (state.refundAddress) {
				params.refundAddress = state.refundAddress;
			}

			const transaction = await createTransaction(params);
			dispatch({ type: "transaction", transaction });
			onConfirm?.();
		} catch (e) {
			console.error(e);
		}
		setIsLoading(false);
	};

	return (
		<div className="inline-flex flex-col space-y-5">
			<div className="flex items-center space-x-2 font-semibold">
				<span className="rounded-full border-2 border-theme-success-500 flex items-center justify-center w-8 h-8">
					2
				</span>
				<span className="text-theme-secondary-700">Confirmation</span>
			</div>

			<div className="flex items-baseline space-x-4">
				<div className="flex flex-col space-y-1">
					<p className="text-theme-secondary-text text-sm">You send</p>
					<h2 className="font-bold text-3xl uppercase">
						{amount} {from.ticker}
					</h2>
					<div className="flex space-x-1 uppercase">
						<span>1 {from?.ticker}</span>
						<span>≈</span>
						<span>
							{unitPrice} {to?.ticker}
						</span>
					</div>
				</div>

				<ArrowRightIcon className="w-12 h-12 text-theme-secondary-500 self-center" />

				<div className="flex flex-col space-y-1">
					<p className="text-theme-secondary-text text-sm">You get</p>
					<h2 className="font-bold text-3xl uppercase">
						<span className="mr-1">≈</span>
						{estimatedAmount} {to.ticker}
					</h2>
					<p>{recipient}</p>
				</div>
			</div>

			<div className="mt-1">
				<p className="text-theme-secondary-text text-sm">Estimated arrival</p>
				<span>≈ {transactionSpeedForecast} minutes</span>
			</div>

			<label className="mt-5">
				<Checkbox
					value={isTermsChecked}
					onChange={(evt) => setIsTermsChecked(evt.target.checked)}
					className="mr-3"
				/>
				I've read and agree to the ChangeNOW{" "}
				<a href="https://changenow.io/terms-of-use" target="_blank">
					Terms of Use
				</a>{" "}
				and{" "}
				<a href="https://changenow.io/privacy-policy" target="_blank">
					Privacy Policy
				</a>
			</label>

			<div className="flex space-x-4">
				<Box
					as="button"
					onClick={createExchange}
					disabled={!isValid || isLoading}
					className="px-5 py-1 rounded border-2 text-lg text-white"
					styled={{ borderColor: "transparent", backgroundColor: isValid ? "#3bee81" : "#b9b9b9" }}
				>
					{isLoading ? <Spinner size="sm" /> : <span>Confirm</span>}
				</Box>

				<Box
					as="button"
					onClick={onBack}
					className="px-5 py-1 rounded border-2 hover:text-theme-success-500 text-lg"
					styled={{ borderColor: "#3bee81", color: "#3bee81" }}
				>
					Back
				</Box>
			</div>
		</div>
	);
};
