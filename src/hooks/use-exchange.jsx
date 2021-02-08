import React from "react";

import { API_KEY } from "../config";
import { useWalletContext } from "../context/WalletProvider";

const API_BASE_URL = 'https://changenow.io/api/v1';

export const useExchange = () => {
    const context = useWalletContext();
    const client = context.http().create();

    const getAllCurrencies = async () => {
        const response = await client.get(`${API_BASE_URL}/currencies?active=true`);
        return response.json();
    }

    const exchangeAmount = async (ticker, amount) => {
        try {
            const response = await client.get(`${API_BASE_URL}/exchange-amount/${amount}/${ticker}?api_key=${API_KEY}`);
            return response.json();
        } catch {
            return { estimatedAmount: 0 }
        }
    }

    const minimalExchangeAmount = async (ticker) => {
        const response = await client.get(`${API_BASE_URL}/min-amount/${ticker}`);
        return response.json();
    }

    return {
        getAllCurrencies,
        exchangeAmount,
        minimalExchangeAmount
    }
}