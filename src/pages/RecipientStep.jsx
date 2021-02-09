import React from "react";
import { InputConvert } from "../components/InputConvert";
import { useWalletContext } from "../context/WalletProvider";
import { validateAddress, validateExternalId } from "../utils/validators";

const { Components } = globalThis.ark;
const { Box, Input } = Components;

export const RecipientStep = ({ state, dispatch, onNext, onBack }) => {
	const { recipient, from, to, refundAddress, amount, estimatedAmount, externalId } = state;
	const walletContext = useWalletContext();

	const [showRefundAddressInput, setShowRefundAddressInput] = React.useState(false);

	const wallets = walletContext.profile().wallets();
	const availableRecipients = wallets.filter((wallet) => wallet.coin.toLowerCase() === to.ticker.toLowerCase());

	const isValidRecipient = recipient?.length && validateAddress(to.ticker, recipient);
	const isValidRefundAddress = refundAddress?.length && validateAddress(from.ticker, recipient);
	const isValidExternalId = externalId?.length && validateExternalId(to.ticker, externalId);

	const isValid = React.useMemo(() => {
		if (showRefundAddressInput && !isValidRefundAddress) {
			return false;
		}

		if (to.hasExternalId && !isValidExternalId) {
			return false;
		}

		return isValidRecipient && amount && estimatedAmount;
	}, [state, showRefundAddressInput]);

	React.useEffect(() => {
		if (from?.isAnonymous) {
			setShowRefundAddressInput(true);
		}
	}, [from]);

	return (
		<div className="inline-flex flex-col space-y-5">
			<div className="flex items-center space-x-2 font-semibold">
				<span className="rounded-full border-2 border-theme-success-500 flex items-center justify-center w-8 h-8">
					1
				</span>
				<span className="text-theme-secondary-700">Send To</span>
			</div>

			<InputConvert state={state} dispatch={dispatch} isTransparent />

			<div className="flex flex-col space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="recipient">Recipient Wallet</label>
					{from.isAnonymous ? null : (
						<>
							{showRefundAddressInput ? (
								<button
									className="text-sm"
									onClick={() => {
										dispatch({
											type: "refundAddress",
											refundAddress: undefined,
										});
										setShowRefundAddressInput(false);
									}}
								>
									Remove refund address
								</button>
							) : (
								<button className="text-sm" onClick={() => setShowRefundAddressInput(true)}>
									+ Add refund address
								</button>
							)}
						</>
					)}
				</div>

				{availableRecipients.length ? (
					<Input
						as="select"
						name="recipient"
						value={recipient}
						onChange={(evt) =>
							dispatch({
								type: "recipient",
								recipient: evt.target.value,
							})
						}
					>
						<option value="">Select recipient address</option>
						{availableRecipients.map((item) => (
							<option key={item.address} value={item.address}>
								{item.address}
							</option>
						))}
					</Input>
				) : (
					<Input
						name="recipient"
						type="text"
						value={recipient}
						onChange={(evt) =>
							dispatch({
								type: "recipient",
								recipient: evt.target.value,
							})
						}
						isInvalid={recipient && !isValidRecipient}
					/>
				)}
			</div>

			{to.hasExternalId ? (
				<Input
					name="external-id"
					type="text"
					placeholder={`${to.externalIdName} (Optional)`}
					value={externalId}
					onChange={(evt) => dispatch({ type: "externalId", externalId: evt.target.value })}
					isInvalid={externalId && !isValidExternalId}
				/>
			) : null}

			{showRefundAddressInput ? (
				<div className="flex flex-col space-y-2">
					<label htmlFor="refund-address">Refund Address</label>
					<Input
						name="refund-address"
						type="text"
						placeholder={`Enter ${from.ticker.toUpperCase()} refund addresss (${
							from.isAnonymous ? "Required" : "Optional"
						})`}
						value={refundAddress}
						onChange={(evt) => dispatch({ type: "refundAddress", refundAddress: evt.target.value })}
						isInvalid={refundAddress && !isValidRefundAddress}
					/>
				</div>
			) : null}

			<div className="flex space-x-4">
				<Box
					as="button"
					onClick={onNext}
					disabled={!isValid}
					className="px-5 py-1 rounded border-2 text-lg text-white"
					styled={{ borderColor: "transparent", backgroundColor: isValid ? "#3bee81" : "#b9b9b9" }}
				>
					Next
				</Box>
				<Box
					as="button"
					onClick={onBack}
					className="px-5 py-1 rounded border-2 hover:text-theme-success-500 text-lg"
					styled={{ borderColor: "#3bee81", color: "#3bee81" }}
				>
					Back
				</Box>
			</div>
		</div>
	);
};
