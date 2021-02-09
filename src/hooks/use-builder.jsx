import React from "react";

const swapReducer = (state, action) => {
	switch (action.type) {
		case "currencies": {
			return {
				...state,
				currencies: action.currencies,
				from: state.from || action.currencies.find((currency) => currency.ticker === "btc"),
				to: state.to || action.currencies.find((currency) => currency.ticker === "ark"),
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
				...state,
				activeTab: 1,
				refundAddress: undefined,
				recipient: "",
				transaction: {},
			};
		}
		case "restore": {
			return action.state;
		}
		case "status": {
			return {
				...state,
				transaction: {
					...state.transaction,
					status: action.status,
				},
			};
		}
		case "activeTab": {
			return {
				...state,
				activeTab: action.activeTab,
			};
		}
		case "isAnonymous": {
			return {
				...state,
				[action.mode]: {
					...state[action.mode],
					isAnonymous: action.isAnonymous,
				},
			};
		}
	}
};

const defaultState = { currencies: [], recipient: "", amount: 1, activeTab: 1 };
export const useBuilder = () => React.useReducer(swapReducer, defaultState);
