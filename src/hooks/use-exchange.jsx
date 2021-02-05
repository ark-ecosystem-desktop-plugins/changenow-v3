import React from "react";

export const useExchange = () => {
    const getAllCurrencies = () => {
        // TODO:
        return Promise.resolve(
            [
                {
                    ticker: "btc",
                    name: "Bitcoin",
                    image: "btc.png",
                    isFiat: false
                },
                {
                    ticker: "ark",
                    name: "ARK",
                    image: "ark.png",
                    isFiat: false
                }
            ]
        );
    }

    const exchangeAmount = (ticker, amount) => {
        // TODO:
        return {
            estimatedAmount: 1.0
        }
    }

    return {
        getAllCurrencies,
        exchangeAmount
    }
}