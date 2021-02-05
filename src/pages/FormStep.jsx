import React from "react";
import { useExchange } from "../hooks/use-exchange";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SwitchIcon } from "../icons/SwitchIcon";

const { Components } = globalThis.ark;
const { Box } = Components;

export const FormStep = ({ state, dispatch }) => {
	const { amount, from, to, currencies, estimatedAmount } = state;
	const { exchangeAmount } = useExchange();
	const [isLoading, setIsLoading] = React.useState(false);
    
    const unitPrice = React.useMemo(() => Number(estimatedAmount / amount).toFixed(7), [estimatedAmount, amount]);

	const fromOptions = React.useMemo(() => {
		return currencies.filter((currency) => {
			const isNotTo = to && currency.ticker !== to.ticker;
			return !currency.isFiat && isNotTo;
		});
	}, [currencies, to]);

	const toOptions = React.useMemo(() => {
		return currencies.filter((currency) => {
			const isNotFrom = to && currency.ticker !== from.ticker;
			return isNotFrom;
		});
	}, [currencies, from]);

	const fetchEstimatedAmount = React.useCallback(async () => {
		setIsLoading(true);
		const ticker = `${from.ticker}_${to.ticker}`;
		const { estimatedAmount } = await exchangeAmount(ticker, amount);
		dispatch({ type: "estimatedAmount", estimatedAmount });

		setIsLoading(false);
	}, [amount, from, to]);

	const toggleCurrencies = () => dispatch({ type: "toggleCurrencies" });

	React.useEffect(() => {
		fetchEstimatedAmount();
	}, [fetchEstimatedAmount]);

	return (
		<form>
			<Box
				className="relative rounded flex items-stretch"
				styled={{ backgroundColor: "#3D3D70", color: "white" }}
			>
				<label className="text-theme-secondary-text absolute top-1 left-5 text-sm">
					You send
				</label>
				<Box
					as="input"
					type="text"
					className="pt-4 pl-5 pb-0 bg-transparent border-0 focus:outline-none text-xl w-full font-medium focus:ring-0"
					styled={{ height: "70px", color: "white" }}
					value={amount}
					onChange={(evt) =>
						dispatch({ type: "amount", amount: evt.target.value })
					}
				/>
				<button
					type="button"
					className="w-2/4 border-l border-theme-secondary-700 px-4 flex items-center justify-between"
				>
					<div className="flex items-center space-x-2">
                        <img src={from?.image} className="w-6" />
                        <span className="uppercase text-xl font-medium">{from?.ticker}</span>
                    </div>
					<span className="w-4 h-4 transform translate-y-0.5">
                        <ChevronDownIcon />
					</span>
				</button>
			</Box>

			<Box className="flex items-center justify-between pr-2 pl-10 py-3 relative">
				<div className="flex items-center space-x-2">
					<div className="text-xs flex space-x-1 uppercase">
						<span>1 {from?.ticker}</span>
						<span>≈</span>
						<span>{unitPrice} {to?.ticker}</span>
					</div>
					<Box
						as="button"
						type="button"
						className="text-xs"
						styled={{ color: "#3bee81" }}
					>
						Expected rate
					</Box>
				</div>

				<Box
					as="button"
					type="button"
					onClick={toggleCurrencies}
                    className="w-5 h-5"
					styled={{ color: "#3bee81" }}
				>
					<SwitchIcon />
				</Box>
			</Box>

			<Box
				className="relative rounded flex items-stretch"
				styled={{ backgroundColor: "#3D3D70", color: "white" }}
			>
				<label className="text-theme-secondary-text absolute top-1 left-5 text-sm">
					You get
				</label>
				<Box
					as="input"
					type="text"
					className="cursor-default pt-4 pl-5 pb-0 bg-transparent border-0 focus:outline-none text-xl w-full font-medium focus:ring-0"
					styled={{ height: "70px", color: "white" }}
					readOnly
                    value={estimatedAmount}
				/>
				<button
					type="button"
					className="w-2/4 border-l border-theme-secondary-700 px-4 flex items-center justify-between"
				>
					<div className="flex items-center space-x-2">
                        <img src={to?.image} className="w-6" />
                        <span className="uppercase text-xl font-medium">{to?.ticker}</span>
                    </div>
					<span className="w-4 h-4 transform translate-y-0.5">
						<ChevronDownIcon />
					</span>
				</button>
			</Box>

			<Box
				as="button"
				type="button"
				className="w-full rounded p-3 text-lg mt-8 font-semibold"
				styled={{ background: "#3bee81", color: "white" }}
			>
				Exchange
			</Box>
		</form>
	);
};
