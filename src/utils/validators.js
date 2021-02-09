import currenciesRules from "./currencies-regex";

export const validateAddress = (currency, address) => {
	if (currenciesRules[currency.toLowerCase()]) {
		const matches = address.match(currenciesRules[currency.toLowerCase()].regEx);
		if (matches) {
			return true;
		}
		return false;
	}
	return true;
};

export const validateExternalId = (currency, id) => {
	const ticker = currency.toLowerCase();
	if (currenciesRules[ticker] && currenciesRules[ticker].regExTag) {
		const matches = id.match(currenciesRules[ticker].regExTag);
		if (matches) {
			return true;
		}
		return false;
	}
	return true;
};
