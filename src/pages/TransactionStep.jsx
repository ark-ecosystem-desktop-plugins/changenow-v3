import React from "react";
import { CopyIcon } from "../icons/CopyIcon";
import { useExchange } from "../hooks/use-exchange";
import { useWalletContext } from "../context/WalletProvider";
import { statuses, finishedStatuses } from "../contants";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";

const { Box, Spinner, Clipboard } = globalThis.ark.Components;

export const TransactionStep = ({ state, dispatch, onFinished }) => {
	const { amount, transaction } = state;
	const { getTransactionStatus } = useExchange();
	const walletContext = useWalletContext();
	const timerRef = React.useRef();

	const isDepositConfirmed = transaction.status === statuses.exchanging || transaction.status === statuses.sending;
	const isSending = transaction.status === statuses.sending;
	const isExchangeFinished = React.useMemo(() => finishedStatuses.includes(transaction.status), [transaction.status]);
	const isExchangeFinishedSuccess = transaction.status === statuses.finished;

	const transactionId = transaction.id;

	const verifyTransactionStatus = React.useCallback(async () => {
		try {
			const response = await getTransactionStatus(transactionId);
			dispatch({ type: "status", payload: response });
		} catch (error) {
			console.error(error);
		}
	}, [transactionId]);

	const onRestart = () => {
		walletContext.store().data().forget("state");
		walletContext.store().persist();
		dispatch({ type: "restart" });
	};

	React.useEffect(() => {
		if (isExchangeFinishedSuccess) {
			onFinished?.();
		}
	}, [isExchangeFinishedSuccess]);

	React.useEffect(() => {
		if (isExchangeFinished && timerRef.current) {
			walletContext.timers().clearInterval(timerRef.current);
		}
	}, [isExchangeFinished]);

	React.useEffect(() => {
		const timer = walletContext.timers().setInterval(() => verifyTransactionStatus(), 10000);
		timerRef.current = timer;

		return () => {
			walletContext.timers().clearInterval(timerRef.current);
		};
	}, [verifyTransactionStatus]);

	return (
		<div className="inline-flex flex-col space-y-4 w-full">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-3 font-semibold">
					<span className="rounded-full border-2 border-theme-success-500 flex items-center justify-center w-8 h-8">
						3
					</span>
					<span className="text-theme-secondary-700">Sending</span>
					<span className="text-theme-secondary-500 font-medium">Transaction Id: {transaction.id}</span>
				</div>
				<Box as="button" type="button" styled={{ color: "#3bee81" }} onClick={onRestart}>
					Start new transaction
				</Box>
			</div>

			<Box as="dl" className="border-2 py-1 px-2" styled={{ borderColor: "#3bee81" }}>
				<dt>You send</dt>
				<dd className="text-2xl font-bold uppercase">
					{amount} {transaction.fromCurrency}
				</dd>

				<dt>To address</dt>
				<dd className="flex items-center space-x-3 text-2xl font-bold">
					{transaction.payinAddress}
					<Clipboard data={transaction.payinAddress}>
						<CopyIcon className="w-5 h-5 text-theme-secondary-text ml-2" />
					</Clipboard>
				</dd>

				{transaction.payinExtraId ? (
					<>
						<dt>{transaction.payinExtraIdName}</dt>
						<dd className="flex items-center space-x-3 text-2xl font-bold">
							{transaction.payinExtraId}
							<Clipboard data={transaction.payinExtraId}>
								<CopyIcon className="w-5 h-5 text-theme-secondary-text ml-2" />
							</Clipboard>
						</dd>
					</>
				) : null}
			</Box>

			<div>
				<p>You get</p>
				<span className="uppercase">
					≈ {transaction.amount} {transaction.toCurrency}
				</span>
			</div>

			<div>
				<p>To address</p>
				<span>{transaction.payoutAddress}</span>
			</div>

			{transaction.payoutExtraId ? (
				<div>
					<p>{transaction.payoutExtraIdName}</p>
					<span>{transaction.payoutExtraId}</span>
				</div>
			) : null}

			<ul className="flex space-x-2">
				<li className="flex-1 flex items-center justify-center border-2 border-theme-secondary-200 px-2 py-1">
					{isDepositConfirmed ? (
						<div className="flex items-center space-x-2">
							<Box as="span" styled={{ color: "#3bee81" }}>
								<CheckCircleIcon className="w-6 h-6" />
							</Box>
							<span>Deposit received</span>
						</div>
					) : (
						<div className="flex items-center space-x-2">
							<Spinner size="sm" />
							<span>Awaiting deposit</span>
						</div>
					)}
				</li>
				<li className="flex-1 flex items-center justify-center border-2 border-theme-secondary-200 px-2 py-1">
					{isSending ? (
						<div className="flex items-center space-x-2">
							<Box as="span" styled={{ color: "#3bee81" }}>
								<CheckCircleIcon className="w-6 h-6" />
							</Box>
							<span>Exchanged</span>
						</div>
					) : (
						<div className="flex items-center space-x-2">
							{isDepositConfirmed ? <Spinner size="sm" /> : null}
							<span>Exchanging</span>
						</div>
					)}
				</li>
				<li className="flex-1 flex items-center justify-center border-2 border-theme-secondary-200 px-2 py-1">
					{isExchangeFinishedSuccess ? (
						<div className="flex items-center space-x-2">
							<Box as="span" styled={{ color: "#3bee81" }}>
								<CheckCircleIcon className="w-6 h-6" />
							</Box>
							<span>Sent to your wallet</span>
						</div>
					) : (
						<div className="flex items-center space-x-2">
							{isSending ? <Spinner size="sm" /> : null}
							<span>Sending to your wallet</span>
						</div>
					)}
				</li>
			</ul>

			<div className="p-1 bg-theme-secondary-200 text-sm">
				<p>If you have any questions about your exchange, please contact our support team via email.</p>
				<Box as="a" href="mailto: support@changenow.io" styled={{ color: "#3bee81" }}>
					support@changenow.io
				</Box>
			</div>
		</div>
	);
};
