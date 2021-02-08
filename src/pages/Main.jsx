import React from "react";
import { FormStep } from "./FormStep";
import { RecipientStep } from "./RecipientStep";

import { MainLayout } from "../layouts/MainLayout";
import { StepLayout } from "../layouts/StepLayout";

import { useExchange } from "../hooks/use-exchange";
import { useBuilder } from "../hooks/use-builder";

const { Components } = globalThis.ark;
const { Tabs, TabPanel } = Components;

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
		<Tabs activeId={activeTab} className="flex-1 flex">
			<TabPanel tabId={1} className="flex-1">
				<MainLayout isLoading={isLoading}>
					<FormStep state={state} dispatch={dispatch} onSubmit={() => setActiveTab(current => current + 1)} />
				</MainLayout>
			</TabPanel>

			<TabPanel tabId={2} className="flex-1 flex items-center justify-center">
				<StepLayout>
					<RecipientStep state={state} dispatch={dispatch} />
				</StepLayout>
			</TabPanel>
		</Tabs>
	);
};
