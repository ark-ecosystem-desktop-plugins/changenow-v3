import React from "react";

import { FormStep } from "./FormStep";
import { RecipientStep } from "./RecipientStep";
import { ReviewStep } from "./ReviewStep";
import { TransactionStep } from "./TransactionStep";
import { SuccessStep } from "./SuccessStep";

import { MainLayout } from "../layouts/MainLayout";
import { StepLayout } from "../layouts/StepLayout";

import { useExchange } from "../hooks/use-exchange";
import { useBuilder } from "../hooks/use-builder";
import { useWalletContext } from "../context/WalletProvider";

const { Components } = globalThis.ark;
const { Tabs, TabPanel } = Components;

export const MainPage = () => {
	const { getAllCurrencies } = useExchange();
	const [state, dispatch] = useBuilder();
	const walletContext = useWalletContext();

	const [isLoading, setIsLoading] = React.useState(false);

	const fetchCurrencies = React.useCallback(async () => {
		const currencies = await getAllCurrencies();
		dispatch({ type: "currencies", currencies });
	}, []);

	const goNext = () => dispatch({ type: "activeTab", activeTab: state.activeTab + 1 });
	const goBack = () => dispatch({ type: "activeTab", activeTab: state.activeTab - 1 });

	React.useLayoutEffect(() => {
		const stored = walletContext.store().data().get("state");
		if (stored) {
			dispatch({ type: "restore", state: stored });
		}
	}, []);

	React.useEffect(() => {
		walletContext.store().data().set("state", state);
		walletContext.store().persist();
	}, [state]);

	React.useEffect(() => {
		const initialize = async () => {
			setIsLoading(true);
			await fetchCurrencies();
			setIsLoading(false);
		};

		initialize();
	}, []);

	return (
		<Tabs activeId={state.activeTab} className="flex-1 flex">
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
					<TransactionStep state={state} dispatch={dispatch} onBack={goBack} onFinished={goNext} />
				</StepLayout>
			</TabPanel>

			<TabPanel tabId={5} className="flex-1 flex items-center justify-center">
				<SuccessStep state={state} dispatch={dispatch} />
			</TabPanel>
		</Tabs>
	);
};
