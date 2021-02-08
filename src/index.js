import React from "react";
import { WalletProvider } from "./context/WalletProvider";
import { MainPage } from "./pages/Main";

export default (api) => {
	api.launch().render(
		<WalletProvider api={api}>
			<MainPage />
		</WalletProvider>,
	);
};
