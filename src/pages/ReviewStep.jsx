import React from "react";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";

const { Components } = globalThis.ark;
const { Box } = Components;

export const ReviewStep = ({ state, onConfirm, onBack }) => {
    const { amount, estimatedAmount, recipient, from, to, transactionSpeedForecast } = state;
    const [isTermsChecked, setIsTermsChecked] = React.useState(false);

    const unitPrice = React.useMemo(
		() => Number(estimatedAmount / amount).toFixed(7),
		[estimatedAmount, amount]
	);

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
                    <h2 className="font-bold text-3xl uppercase">{amount} {from.ticker}</h2>
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
                    <h2 className="font-bold text-3xl uppercase"><span className="mr-1">≈</span>{estimatedAmount} {to.ticker}</h2>
                    <p>{recipient}</p>
                </div>
            </div>

            <div className="mt-1">
                <p className="text-theme-secondary-text text-sm">Estimated arrival</p>
                <span>≈ {transactionSpeedForecast} minutes</span>
            </div>
            
            <label className="mt-5">
                <input type="checkbox" value={isTermsChecked} onChange={evt => setIsTermsChecked(evt.target.checked)} />
                I've read and agree to the ChangeNOW <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
            </label>

            <div className="flex space-x-4">
				<button onClick={onConfirm} disabled={!isTermsChecked}>Confirm</button>
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
}