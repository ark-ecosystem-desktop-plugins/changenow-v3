import React from "react";
import { useWalletContext } from "../context/WalletProvider";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { CopyIcon } from "../icons/CopyIcon";

const { Box, Clipboard } = globalThis.ark.Components;

export const SuccessStep = ({ state, dispatch }) => {
	const walletContext = useWalletContext();
	const { transaction, from, to } = state;

	const payinHashLink = from.transactionExplorerMask
		? from.transactionExplorerMask.replace("$$", transaction.payinHash)
		: "";
	const payinAddressLink = from.addressExplorerMask
		? from.addressExplorerMask.replace("$$", transaction.payinAddress)
		: "";
	const payoutHashLink = to.transactionExplorerMask
		? from.transactionExplorerMask.replace("$$", transaction.payoutHash)
		: "";
	const payoutAddressLink = to.addressExplorerMask
		? from.addressExplorerMask.replace("$$", transaction.payoutAddress)
		: "";

	const parseDate = (date) => {
		return new Date(date).toLocaleString();
	};

	const onRestart = () => {
		walletContext.store().data().forget("state");
		walletContext.store().persist();
		dispatch({ type: "restart" });
	};

	return (
		<div className="w-full max-w-4xl p-2 flex flex-col space-y-3">
			<div className="relative flex flex-col items-center justify-center bg-theme-secondary-200 p-2 rounded">
				<Box
					as="button"
					type="button"
					className="absolute right-2 top-2"
					styled={{ color: "#3bee81" }}
					onClick={onRestart}
				>
					Start new transaction
				</Box>
				<Box as="span" styled={{ color: "#3bee81" }}>
					<CheckCircleIcon className="w-16 h-16" />
				</Box>
				<p className="font-bold text-2xl mt-3 text-theme-secondary-800">Transaction is completed!</p>
			</div>

			<div className="shadow-md p-4 flex flex-col space-y-4">
				<div className="flex items-center space-x-3">
					<Box
						className="w-10 h-10 rounded-full text-white font-bold text-xl flex items-center justify-center"
						styled={{ backgroundColor: "#3bee81" }}
					>
						1
					</Box>
					<p className="text-xl font-bold">
						Your <span className="uppercase">{transaction.fromCurrency}</span> Wallet
					</p>
					<span className="text-theme-secondary-text">{parseDate(transaction.depositReceivedAt)}</span>
				</div>

				<div className="flex items-center space-x-7">
					<div className="bg-theme-secondary-200 w-24 h-24 rounded-full flex items-center justify-center p-5">
						<img src="https://changenow.io/images/exchange/wallet-icon.svg" />
					</div>
					<div className="flex-1 flex flex-col space-y-2">
						<div className="flex items-center">
							<p className="w-64">Input Transaction Hash</p>
							<div className="flex-1 flex items-center space-x-2">
								<Box
									as="a"
									target="_blank"
									href={payinHashLink}
									className="text-sm font-medium"
									styled={{ color: "#3bee81" }}
								>
									{transaction.payinHash}
								</Box>
								<Clipboard data={transaction.payinHash}>
									<CopyIcon className="w-5 h-5 text-theme-secondary-text ml-2" />
								</Clipboard>
							</div>
						</div>

						<div className="flex items-center">
							<p className="w-64">ChangeNOW Address</p>
							<div className="flex-1 flex items-center space-x-2">
								<Box
									as="a"
									target="_blank"
									href={payinAddressLink}
									className="text-sm font-medium"
									styled={{ color: "#3bee81" }}
								>
									{transaction.payinAddress}
								</Box>
								<Clipboard data={transaction.payinAddress}>
									<CopyIcon className="w-5 h-5 text-theme-secondary-text ml-2" />
								</Clipboard>
							</div>
						</div>

						<div className="flex items-center">
							<p className="w-64 font-bold">Amount Sent</p>
							<p className="flex-1 font-bold">
								{transaction.amountSend} {transaction.fromCurrency?.toUpperCase()}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="shadow-md p-4 flex flex-col space-y-4">
				<div className="flex items-center space-x-3">
					<Box
						className="w-10 h-10 rounded-full text-white font-bold text-xl flex items-center justify-center"
						styled={{ backgroundColor: "#3bee81" }}
					>
						2
					</Box>
					<p className="text-xl font-bold">
						Your <span className="uppercase">{transaction.toCurrency}</span> Wallet
					</p>
					<span className="text-theme-secondary-text">{parseDate(transaction.updatedAt)}</span>
				</div>

				<div className="flex items-center space-x-7">
					<div className="bg-theme-secondary-200 w-24 h-24 rounded-full flex items-center justify-center p-5">
						<img src="https://changenow.io/images/exchange/exchange-icon.svg" />
					</div>
					<div className="flex-1 flex flex-col space-y-2">
						<div className="flex items-center">
							<p className="w-64">Output Transaction Hash</p>
							<div className="flex-1 flex items-center space-x-2">
								<Box
									as="a"
									target="_blank"
									href={payoutHashLink}
									className="text-sm font-medium"
									styled={{ color: "#3bee81" }}
								>
									{transaction.payoutHash}
								</Box>
								<Clipboard data={transaction.payoutHash}>
									<CopyIcon className="w-5 h-5 text-theme-secondary-text ml-2" />
								</Clipboard>
							</div>
						</div>

						<div className="flex items-center">
							<p className="w-64">Your {transaction.toCurrency?.toUpperCase()} Address</p>
							<div className="flex-1 flex items-center space-x-2">
								<Box
									as="a"
									target="_blank"
									href={payoutAddressLink}
									className="text-sm font-medium"
									styled={{ color: "#3bee81" }}
								>
									{transaction.payoutAddress}
								</Box>
								<Clipboard data={transaction.payoutAddress}>
									<CopyIcon className="w-5 h-5 text-theme-secondary-text ml-2" />
								</Clipboard>
							</div>
						</div>

						<div className="flex items-center">
							<p className="w-64 font-bold">Amount Received</p>
							<p className="flex-1 font-bold">
								{transaction.amountReceive} {transaction.toCurrency?.toUpperCase()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
