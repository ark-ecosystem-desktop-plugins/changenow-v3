import React from "react";

const swapReducer = (state, action) => {
	switch (action.type) {
		case "currencies": {
			return {
				...state,
				currencies: action.currencies,
				from: action.currencies.find((currency) => currency.ticker === "btc"),
				to: action.currencies.find((currency) => currency.ticker === "ark"),
			};
		}
		case "from": {
			return {
				...state,
				from: action.from,
				estimatedAmount: undefined,
				transactionSpeedForecast: undefined,
				minAmount: undefined,
			};
		}
		case "to": {
			return {
				...state,
				to: action.to,
				estimatedAmount: undefined,
				transactionSpeedForecast: undefined,
				minAmount: undefined,
			};
		}
		case "toggleCurrencies": {
			return {
				...state,
				from: state.to,
				to: state.from,
				estimatedAmount: undefined,
				transactionSpeedForecast: undefined,
				minAmount: undefined,
			};
		}
		case "amount": {
			return {
				...state,
				amount: action.amount,
				estimatedAmount: undefined,
				transactionSpeedForecast: undefined,
				minAmount: undefined,
			};
		}
		case "estimatedAmount": {
			return {
				...state,
				estimatedAmount: action.estimatedAmount,
				transactionSpeedForecast: action.transactionSpeedForecast,
			};
		}
		case "minAmount": {
			return {
				...state,
				minAmount: action.minAmount,
			};
		}
		case "recipient": {
			return {
				...state,
				recipient: action.recipient,
			};
		}
		case "refundAddress": {
			return {
				...state,
				refundAddress: action.refundAddress,
			};
		}
		case "transaction": {
			return {
				...state,
				transaction: action.transaction,
			};
		}
		case "restart": {
			return {
				transaction: undefined,
				refundAddress: undefined,
				recipient: undefined,
			};
		}
	}
};

export const useBuilder = () => React.useReducer(swapReducer, { currencies: [], recipient: "", amount: 1 });
