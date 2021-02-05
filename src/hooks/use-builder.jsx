import React from "react";

const swapReducer = (state, action) => {
    switch (action.type) {
        case "currencies": {
            return {
                ...state,
                currencies: action.currencies,
                from: action.currencies.find(currency => currency.ticker === "btc"),
                to: action.currencies.find(currency => currency.ticker === "ark"),
            }
        }
        case "from": {
            return {
                ...state,
                from: action.from
            }
        }
        case "to": {
            return {
                ...state,
                to: action.to
            }
        }
        case "toggleCurrencies": {
            return {
                ...state,
                from: state.to,
                to: state.from
            }
        }
        case "amount": {
            return {
                ...state,
                amount: action.amount
            }
        }
        case "estimatedAmount": {
            return {
                ...state,
                estimatedAmount: action.estimatedAmount
            }
        }
        case "recipient": {
            return {
                ...state,
                recipient: action.recipient,
            }
        }
        case "refundAddress": {
            return {
                ...state,
                refundAddress: action.refundAddress
            }
        }
    }
}

export const useBuilder = () => React.useReducer(swapReducer, { currencies: [], amount: 1 });