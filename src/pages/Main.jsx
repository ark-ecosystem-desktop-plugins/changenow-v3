import React from "react";

import { FormStep } from "./FormStep";
import { RecipientStep } from "./RecipientStep";
import { ReviewStep } from "./ReviewStep";

import { MainLayout } from "../layouts/MainLayout";
import { StepLayout } from "../layouts/StepLayout";

import { useExchange } from "../hooks/use-exchange";
import { useBuilder } from "../hooks/use-builder";
import { TransactionStep } from "./TransactionStep";

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

	const goNext = () => setActiveTab((current) => current + 1);
	const goBack = () => setActiveTab((current) => current - 1);

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
					<FormStep state={state} dispatch={dispatch} onSubmit={goNext} />
				</MainLayout>
			</TabPanel>

			<TabPanel tabId={2} className="flex-1 flex items-center justify-center">
				<StepLayout>
					<RecipientStep state={state} dispatch={dispatch} onNext={goNext} onBack={goBack} />
				</StepLayout>
			</TabPanel>

			<TabPanel tabId={3} className="flex-1 flex items-center justify-center">
				<StepLayout>
					<ReviewStep state={state} dispatch={dispatch} onConfirm={goNext} onBack={goBack} />
				</StepLayout>
			</TabPanel>

			<TabPanel tabId={4} className="flex-1 flex items-center justify-center">
				<StepLayout>
					<TransactionStep state={state} dispatch={dispatch} onBack={goBack} />
				</StepLayout>
			</TabPanel>
		</Tabs>
	);
};
