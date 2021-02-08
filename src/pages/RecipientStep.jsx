import React from "react";
import { InputConvert } from "../components/InputConvert";
import { useWalletContext } from "../context/WalletProvider";

const { Components } = globalThis.ark;
const { Box } = Components;

export const RecipientStep = ({ state, dispatch }) => {
	const { recipient, from, to, refundAdress } = state;
	const walletContext = useWalletContext();

	const [showRefundAddressInput, setShowRefundAddressInput] = React.useState(
		false
	);

	const wallets = walletContext.profile().wallets();
	const availableRecipients = wallets.filter(
		(wallet) => wallet.coin.toLowerCase() === to.ticker.toLowerCase()
	);

	return (
		<div className="inline-flex flex-col space-y-5">
			<div className="flex items-center space-x-2 font-semibold">
				<span className="rounded-full border-2 border-theme-success-500 flex items-center justify-center w-8 h-8">
					1
				</span>
				<span className="text-theme-secondary-700">Send To</span>
			</div>

			<InputConvert state={state} dispatch={dispatch} />

			<div className="flex items-center justify-between">
				<label htmlFor="recipient">Recicipent Wallet</label>
				{showRefundAddressInput ? (
					<button
						className="text-sm"
						onClick={() => {
							dispatch({
								type: "refundAddress",
								refundAdress: undefined,
							});
							setShowRefundAddressInput(false);
						}}
					>
						Remove refund address
					</button>
				) : (
					<button className="text-sm" onClick={() => setShowRefundAddressInput(true)}>Add refund address</button>
				)}
			</div>

			{availableRecipients.length ? (
				<select name="recipient">
					{availableRecipients.map((recipient) => (
						<option value={recipient.address}>
							{recipient.address}
						</option>
					))}
				</select>
			) : (
				<input
					name="recipient"
					type="text"
					value={recipient}
					onChange={(evt) =>
						dispatch({
							type: "recipient",
							recipient: evt.target.value,
						})
					}
				/>
			)}

			{showRefundAddressInput ? (
				<div className="flex flex-col space-y-2">
					<label htmlFor="refund-address">Refund Wallet</label>
					<input name="refund-address" type="text" placeholder={`Enter ${from.ticker} refund addresss (Optional)`} />
				</div>
			) : null}

			<div className="flex space-x-4">
				<button>Next</button>
				<Box
					as="button"
					className="px-5 py-1 rounded border-2 hover:text-theme-success-500 text-lg"
					styled={{ borderColor: "#3bee81", color: "#3bee81" }}
				>
					Back
				</Box>
			</div>
		</div>
	);
};
