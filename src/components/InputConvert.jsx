import React from "react";
import { Listbox } from "./Listbox";
import { useExchange } from "../hooks/use-exchange";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SwitchIcon } from "../icons/SwitchIcon";

const { Components } = globalThis.ark;
const { Box, Spinner, InputCurrency } = Components;

const InputAmount = React.forwardRef((props, ref) => {
	return (
		<Box
			as="input"
			type="text"
			className="pt-4 pl-5 pb-0 bg-transparent border-0 focus:outline-none text-xl w-full font-medium focus:ring-0"
			styled={{ height: "70px" }}
			ref={ref}
			{...props}
		/>
	);
});

export const InputConvert = ({ state, dispatch, isTransparent }) => {
	const { amount, from, to, currencies, estimatedAmount, minAmount } = state;
	const { exchangeAmount, minimalExchangeAmount, getCurrencyInfo } = useExchange();

	const [isLoading, setIsLoading] = React.useState(false);

	const [isFromFilterOpen, setIsFromFilterOpen] = React.useState(false);
	const [fromFilterQuery, setFromFilterQuery] = React.useState("");

	const [isToFilterOpen, setIsToFilterOpen] = React.useState(false);
	const [toFilterQuery, setToFilterQuery] = React.useState("");

	const unitPrice = React.useMemo(() => (estimatedAmount ? Number(estimatedAmount / amount).toFixed(7) : 0), [
		estimatedAmount,
		amount,
	]);
	const isAmountTooLow = minAmount > amount;

	const fromOptions = React.useMemo(() => {
		const filter = fromFilterQuery.toLowerCase().trim();
		return currencies.filter((currency) => {
			const name = currency.name.toLowerCase();
			const ticker = currency.ticker.toLowerCase();
			const isNotTo = to && currency.ticker !== to.ticker;
			return (ticker.includes(filter) || name.includes(filter)) && !currency.isFiat && isNotTo;
		});
	}, [currencies, to, fromFilterQuery]);

	const toOptions = React.useMemo(() => {
		const filter = toFilterQuery.toLowerCase().trim();
		return currencies.filter((currency) => {
			const name = currency.name.toLowerCase();
			const ticker = currency.ticker.toLowerCase();
			const isNotFrom = from && currency.ticker !== from.ticker;
			return (ticker.includes(filter) || name.includes(filter)) && !currency.isFiat && isNotFrom;
		});
	}, [currencies, from, toFilterQuery]);

	const convertAmount = React.useCallback(async () => {
		setIsLoading(true);

		try {
			const ticker = `${from.ticker}_${to.ticker}`;

			const { minAmount } = await minimalExchangeAmount(ticker);
			dispatch({ type: "minAmount", minAmount });

			if (minAmount > amount) {
				return;
			}

			const { estimatedAmount, transactionSpeedForecast } = await exchangeAmount(ticker, amount);
			dispatch({
				type: "estimatedAmount",
				estimatedAmount,
				transactionSpeedForecast,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, [amount, from, to]);

	const toggleCurrencies = () => dispatch({ type: "toggleCurrencies" });

	const fetchCurrencyInfo = async (mode, ticker) => {
		const result = await getCurrencyInfo(ticker);
		dispatch({
			type: "additionalCurrencyInfo",
			payload: {
				isAnonymous: result.isAnonymous,
				externalIdName: result.externalIdName,
				transactionExplorerMask: result.transactionExplorerMask,
				addressExplorerMask: result.addressExplorerMask,
			},
			mode,
		});
	};

	React.useEffect(() => {
		if (from?.ticker) {
			fetchCurrencyInfo("from", from.ticker);
		}
	}, [from?.ticker]);

	React.useEffect(() => {
		if (to?.ticker) {
			fetchCurrencyInfo("to", to.ticker);
		}
	}, [to?.ticker]);

	React.useEffect(() => {
		convertAmount();
	}, [convertAmount]);

	return (
		<div
			onMouseDown={() => {
				setIsFromFilterOpen(false);
				setIsToFilterOpen(false);
			}}
		>
			{isAmountTooLow ? (
				<p className="text-theme-danger-400 text-sm mb-1">
					Minimum amount{" "}
					<span className="uppercase">
						{minAmount} {from.ticker}
					</span>
				</p>
			) : null}
			<Box
				className={`relative rounded flex items-stretch ${
					isTransparent ? "text-theme-secondary-900 border border-theme-secondary-400" : "text-white"
				}`}
				styled={{ backgroundColor: isTransparent ? "transparent" : "#3D3D70" }}
			>
				<label className="text-theme-secondary-text absolute top-1 left-5 text-sm">You send</label>
				<InputCurrency
					as={InputAmount}
					value={amount}
					onChange={(currency) => dispatch({ type: "amount", amount: currency.value / 1e8 })}
				/>
				<button
					type="button"
					className={`w-3/5  px-4 flex items-center justify-between border-l ${
						isTransparent ? "border-theme-secondary-400" : "border-theme-secondary-700"
					}`}
					onClick={() => setIsFromFilterOpen((prev) => !prev)}
				>
					<div className="flex items-center space-x-2">
						<img src={from?.image} className="w-6" />
						<span className="uppercase text-xl font-medium">{from?.ticker}</span>
					</div>
					<span className="w-4 h-4 transform translate-y-0.5">
						<ChevronDownIcon />
					</span>
				</button>

				<Listbox
					isOpen={isFromFilterOpen}
					options={fromOptions}
					search={fromFilterQuery}
					onSearch={setFromFilterQuery}
					onSelect={(selected) => {
						dispatch({ type: "from", from: selected });
						setIsFromFilterOpen(false);
					}}
				/>
			</Box>

			<Box className="flex items-center justify-between pr-2 pl-10 py-3 relative">
				<div className="flex items-center space-x-2">
					<span
						className={`absolute w-3 h-3 left-0 transform translate-x-3.5 rounded-full ml-px ${
							isTransparent ? "bg-theme-secondary-400" : "bg-theme-secondary-700"
						}`}
					/>
					<span
						className={`absolute top-0 w-0.5 h-full -left-2 transform translate-x-5 ${
							isTransparent ? "bg-theme-secondary-400" : "bg-theme-secondary-700"
						}`}
					/>
					<div className="text-xs flex space-x-1 uppercase">
						<span>1 {from?.ticker}</span>
						<span>≈</span>
						<span>
							{unitPrice || "-"} {to?.ticker}
						</span>
					</div>
					<Box as="button" type="button" className="text-xs" styled={{ color: "#3bee81" }}>
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
				className={`relative rounded flex items-stretch ${
					isTransparent ? "text-theme-secondary-900 border border-theme-secondary-400" : "text-white"
				}`}
				styled={{ backgroundColor: isTransparent ? "transparent" : "#3D3D70" }}
			>
				<label className="text-theme-secondary-text absolute top-1 left-5 text-sm">You get</label>

				{isLoading ? (
					<Box className="w-full pt-4 pl-5 pb-0 flex items-center" styled={{ height: "70px" }}>
						<Spinner size="sm" />
					</Box>
				) : (
					<Box
						as="input"
						type="text"
						className="cursor-default pt-4 pl-5 pb-0 bg-transparent border-0 focus:outline-none text-xl w-full font-medium focus:ring-0"
						styled={{ height: "70px" }}
						readOnly
						defaultValue={estimatedAmount || "-"}
					/>
				)}
				<button
					type="button"
					className={`w-3/5  px-4 flex items-center justify-between border-l ${
						isTransparent ? "border-theme-secondary-400" : "border-theme-secondary-700"
					}`}
					onClick={() => setIsToFilterOpen((prev) => !prev)}
				>
					<div className="flex items-center space-x-2">
						<img src={to?.image} className="w-6" />
						<span className="uppercase text-xl font-medium">{to?.ticker}</span>
					</div>
					<span className="w-4 h-4 transform translate-y-0.5">
						<ChevronDownIcon />
					</span>
				</button>

				<Listbox
					isOpen={isToFilterOpen}
					options={toOptions}
					search={toFilterQuery}
					onSearch={setToFilterQuery}
					onSelect={(selected) => {
						dispatch({ type: "to", to: selected });
						setIsToFilterOpen(false);
					}}
				/>
			</Box>
		</div>
	);
};
