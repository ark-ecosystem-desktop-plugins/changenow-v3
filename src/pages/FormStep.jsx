import React from "react";
import { useWalletContext } from "../context/WalletProvider";
import { useExchange } from "../hooks/use-exchange";

const { Components } = globalThis.ark;
const { Box, InputCurrency } = Components;

export const FormStep = ({ state, dispatch }) => {
    const { amount, from, to, currencies } = state;
    const { exchangeAmount } = useExchange();
	const [isLoading, setIsLoading] = React.useState(false);
    
    const fromOptions = React.useMemo(() => {
        return currencies.filter(currency => {
            const isNotTo = to && currency.ticker !== to.ticker;
            return !currency.isFiat && isNotTo;
        });
    }, [currencies, to]);

    const toOptions = React.useMemo(() => {
        return currencies.filter(currency => {
            const isNotFrom = to && currency.ticker !== from.ticker;
            return isNotFrom;
        });
    }, [currencies, from]);

    const fetchEquivalentAmount = React.useCallback(async () => {
        setIsLoading(true);

        const ticker = `${from.ticker}_${to.ticker}`;
        const { equivalentAmount } = exchangeAmount(ticker, amount);
        dispatch({ type: "equivalentAmount", equivalentAmount });

        setIsLoading(false);
    }, [amount, from, to]);

    const toggleCurrencies = () => dispatch({ type: "toggleCurrencies" });

    React.useEffect(() => {
        fetchEquivalentAmount();
    }, [fetchEquivalentAmount]);

	return (
		<form>
            <Box
                className="relative rounded flex items-center"
                styled={{ backgroundColor: "#3D3D70", color: "white" }}
            >
                <label className="text-theme-secondary-text absolute top-1 left-5 text-sm">You send</label>
                <Box as="input" type="text" className="pt-4 pl-5 pb-0 bg-transparent border-0 focus:outline-none text-xl w-full font-medium focus:ring-0" styled={{ height: "70px", color: "white" }} value={amount} onChange={value => dispatch({ type: "amount", amount: value })} />
                <select value={from?.ticker}>
                    {fromOptions.map(opt => (<option value={opt.ticker}>{opt.name}</option>))}
                </select>
            </Box>

            <Box className="flex items-center justify-between pr-2 pl-10 py-3 relative">
                <div className="flex items-center space-x-2">
                    <div className="text-xs flex space-x-1 uppercase">
                        <span>{from?.ticker}</span>
                        <span>≈</span>
                        <span>{to?.ticker}</span>
                    </div>
                    <Box as="button" type="button" className="text-xs" styled={{ color: "#3bee81" }}>Expected rate</Box>
                </div>

                <Box as="button" type="button" onClick={toggleCurrencies} styled={{ color: "#3bee81" }}>Toggle</Box>
            </Box>

            <Box
                className="relative rounded flex items-center"
                styled={{ backgroundColor: "#3D3D70", color: "white" }}
            >
                <label className="text-theme-secondary-text absolute top-1 left-5 text-sm">You get</label>
                <Box as="input" type="text" className="pt-4 pl-5 pb-0 bg-transparent border-0 focus:outline-none text-xl w-full font-medium focus:ring-0" styled={{ height: "70px", color: "white" }} readOnly />
                <select value={from?.ticker}>
                    {toOptions.map(opt => (<option value={opt.ticker}>{opt.name}</option>))}
                </select>
            </Box>
        
            <Box as="button" type="button" className="w-full rounded p-3 text-lg mt-8 font-semibold" styled={{ background: "#3bee81", color: "white" }}>Exchange</Box>
		</form>
	);
};
