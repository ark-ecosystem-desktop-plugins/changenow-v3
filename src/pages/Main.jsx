import React from "react";
import { FormStep } from "./FormStep";
import { RecipientStep } from "./RecipientStep";

import { Layout } from "../components/Layout";
import { useExchange } from "../hooks/use-exchange";
import { useBuilder } from "../hooks/use-builder";

const { Components } = globalThis.ark;
const { Box, Tabs, TabPanel } = Components;

export const MainPage = () => {
	const { getAllCurrencies } = useExchange();
	const [state, dispatch] = useBuilder();

	const [isLoading, setIsLoading] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState(1);

	const fetchCurrencies = React.useCallback(async () => {
		const currencies = await getAllCurrencies();
		dispatch({ type: "currencies", currencies });
	}, []);

	React.useEffect(() => {
		const initialize = async () => {
			setIsLoading(true);
			await fetchCurrencies();
			setIsLoading(false);
		};

		initialize();
	}, []);

	return (
		<Layout>
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<Tabs activeId={activeTab}>
					<TabPanel tabId={1}>
						<FormStep state={state} dispatch={dispatch} />
					</TabPanel>
					<TabPanel tabId={2}>
						<RecipientStep />
					</TabPanel>
				</Tabs>
			)}
		</Layout>
	);
};
