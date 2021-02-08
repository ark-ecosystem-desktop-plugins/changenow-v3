import React from "react";
import { CopyIcon } from "../icons/CopyIcon";

const { Box } = globalThis.ark.Components;

export const TransactionStep = ({ state, onRestart }) => {
	const { amount, transaction } = state;

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
					<button>
						<CopyIcon className="w-5 h-5 text-theme-secondary-text ml-2" />
					</button>
				</dd>

				{transaction.payinExtraId ? (
					<>
						<dt>{transaction.payinExtraIdName}</dt>
						<dd className="flex items-center space-x-3 text-2xl font-bold">
							{payinExtraId}
							<button>
								<CopyIcon className="w-5 h-5 text-theme-secondary-text ml-2" />
							</button>
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
				<li className="flex-1 border-2 border-theme-secondary-200 text-center px-2 py-1">Awaiting deposit</li>
				<li className="flex-1 border-2 border-theme-secondary-200 text-center px-2 py-1">Exchanging</li>
				<li className="flex-1 border-2 border-theme-secondary-200 text-center px-2 py-1">
					Sending to your wallet
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
