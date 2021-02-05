import React from "react";
import { ImageWorld } from "../components/ImageWorld";

const { Components } = globalThis.ark;
const { Box, Spinner } = Components;

export const Layout = ({ children, isLoading }) => {
	return (
		<Box
			as="section"
			className="flex-1 flex flex-col relative"
			styled={{
				color: "white",
				background:
					"#2B2B37 radial-gradient(ellipse 210px 210px at 100% 40%, rgba(110, 14, 125, 0.2), #2B2B37)",
			}}
		>
			<header className="flex flex-wrap items-center p-5">
				<svg
					width="128"
					height="128"
					viewBox="0 0 128 128"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="ChangeNOW-logo-transparent">
						<g id="Group">
							<path
								id="NOW"
								fillRule="evenodd"
								clipRule="evenodd"
								d="M25.6804 91.258H22.4865V66.1474H25.6266L39.802 85.8635H39.9635V66.1474H43.1574V91.258H40.0173L25.8419 71.6115H25.6804V91.258ZM60.3341 65.7297C67.673 65.7297 72.2666 70.7414 72.2666 78.7114C72.2666 86.6814 67.673 91.6757 60.3341 91.6757C52.9952 91.6757 48.4017 86.6814 48.4017 78.7114C48.4017 70.7414 52.9952 65.7297 60.3341 65.7297ZM60.3341 68.6184C55.0408 68.6184 51.7213 72.5164 51.7213 78.7114C51.7213 84.889 55.0408 88.787 60.3341 88.787C65.6275 88.787 68.947 84.889 68.947 78.7114C68.947 72.5164 65.6275 68.6184 60.3341 68.6184ZM90.9864 71.3331L85.0112 91.258H81.9609L74.9091 66.1474H78.2824L83.4681 86.6466H83.6117L89.4433 66.1474H92.709L98.5406 86.6466H98.6842L103.87 66.1474H107.243L100.191 91.258H97.1411L91.1659 71.3331H90.9864Z"
								fill="#3BEE81"
							/>
							<path
								id="change"
								fillRule="evenodd"
								clipRule="evenodd"
								d="M32.7601 46.3002H30.5858C30.306 44.8275 29.0854 43.6622 27.0255 43.6622C24.635 43.6622 23.0074 45.6599 23.0074 48.7078C23.0074 51.8453 24.6604 53.7534 27.0509 53.7534C28.9582 53.7534 30.2297 52.8569 30.6112 51.1922H32.7855C32.4168 53.8814 30.1662 55.7383 27.0382 55.7383C23.2744 55.7383 20.7568 53.049 20.7568 48.7078C20.7568 44.469 23.2617 41.6773 27.0127 41.6773C30.4078 41.6773 32.4804 43.8799 32.7601 46.3002ZM35.4702 55.6102V36.3243H37.6827V44.0464H37.7335C38.5855 42.484 39.9842 41.6773 42.0822 41.6773C45.0831 41.6773 46.9141 43.7262 46.9141 46.7997V55.6102H44.7016V47.1967C44.7016 44.994 43.5954 43.6622 41.421 43.6622C39.1068 43.6622 37.6827 45.2501 37.6827 47.6705V55.6102H35.4702ZM54.7612 53.8046C56.9991 53.8046 58.6394 52.3447 58.6394 50.3598V49.2456L55.0536 49.4761C52.9937 49.6042 51.9256 50.3598 51.9256 51.6916C51.9256 52.9722 53.0319 53.8046 54.7612 53.8046ZM54.2907 55.7383C51.506 55.7383 49.6623 54.1247 49.6623 51.6788C49.6623 49.3097 51.4679 47.9138 54.7993 47.7089L58.6394 47.4784V46.3259C58.6394 44.6098 57.5204 43.6622 55.4987 43.6622C53.9093 43.6622 52.7267 44.4818 52.4597 45.788H50.3362C50.3998 43.4573 52.6504 41.6773 55.5241 41.6773C58.7665 41.6773 60.8519 43.4189 60.8519 46.1338V55.6102H58.7538V53.2155H58.703C57.9273 54.7522 56.2107 55.7383 54.2907 55.7383ZM64.2232 55.6102V41.8053H66.3085V44.0464H66.3593C67.224 42.484 68.5845 41.6773 70.708 41.6773C73.7216 41.6773 75.4636 43.6238 75.4636 46.7613V55.6102H73.2511V47.1454C73.2511 44.8916 72.2084 43.6622 70.0468 43.6622C67.7962 43.6622 66.4356 45.2245 66.4356 47.5937V55.6102H64.2232ZM84.3788 53.6253C86.782 53.6253 88.4096 51.6147 88.4096 48.6566C88.4096 45.6856 86.782 43.6622 84.3788 43.6622C81.9883 43.6622 80.4243 45.6343 80.4243 48.6566C80.4243 51.666 81.9883 53.6253 84.3788 53.6253ZM84.4169 60.5406C81.3144 60.5406 79.0637 59.0294 78.7459 56.7372H81.0474C81.378 57.8897 82.7385 58.6068 84.5441 58.6068C86.9092 58.6068 88.4096 57.3647 88.4096 55.4053V53.2411H88.3587C87.4941 54.7394 85.8792 55.6102 83.9592 55.6102C80.4879 55.6102 78.1609 52.8313 78.1609 48.6566C78.1609 44.4434 80.4879 41.6773 84.01 41.6773C85.9428 41.6773 87.5576 42.5353 88.4732 44.0464H88.5113V41.8053H90.6221V55.2261C90.6221 58.53 88.2697 60.5406 84.4169 60.5406ZM99.5246 43.6366C97.3756 43.6366 95.8244 45.2117 95.6718 47.5424H103.212C103.161 45.1989 101.686 43.6366 99.5246 43.6366ZM103.161 51.666H105.348C104.967 54.0351 102.589 55.7383 99.6644 55.7383C95.8116 55.7383 93.383 53.0362 93.383 48.759C93.383 44.4818 95.8244 41.6773 99.5627 41.6773C103.225 41.6773 105.514 44.2769 105.514 48.4517V49.3225H95.6718V49.4505C95.6718 52.0758 97.2739 53.779 99.7153 53.779C101.432 53.779 102.767 52.9594 103.161 51.666Z"
								fill="white"
							/>
						</g>
					</g>
				</svg>
				<Box
					className="sm:block hidden"
					styled={{
						width: "1px",
						height: "40px",
						background: "#3D3D70",
					}}
				/>
				<Box className="sm:block hidden ml-4 text-theme-secondary-text">
					Cryptocurrency Exchange
				</Box>
			</header>

			<Box
				className="flex-1 flex items-center justify-center px-3 z-5"
				styled={{
					background:
						"radial-gradient(ellipse 390px 390px at 0% 40%, rgba(109, 107, 217, 0.3), #2B2B37, transparent)",
				}}
			>
				<ImageWorld />

				<div className="lg:w-4/5 w-full lg:p-2 p-1 flex flex-col lg:flex-row p-5 z-20">
					{isLoading ? (
						<div className="mx-auto">
							<Spinner size="lg" />
						</div>
					) : (
						<>
							<div className="w-3/5">
								<Box
									as="h1"
									className="text-5xl font-bold"
									styled={{ color: "white" }}
								>
									Limitless exchange
								</Box>
								<Box
									as="p"
									className="mb-8 text-2xl"
									styled={{ color: "#5c5780" }}
								>
									Fast coin swaps free of custody
								</Box>
								<div className="mb-4 inline-block capitalize relative">
									<Box
										as="p"
										className="text-lg font-bold"
										styled={{ color: "#FFC24A" }}
									>
										What you see is what you get
									</Box>
									<Box
										as="img"
										className="absolute w-4 transform -translate-y-12 translate-x-5 right-0"
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGPSURBVHgBrVRLUsJAEO2ecaMrPIHhBMraKgk7YJPcADmBeALxBMAN9AasxF1Ey703MJ7ArLCkTNpOTCzzmWTG4q0y/Zvp168DYADy+hY9D49McoRJMEh04QvGJil7JsGAYgQQBUYpuoExPSDFa3KQYOHp3ZtOnj5FMT0ZDGgymYHz+4XU1U3SoihHT4Zwc4i9h8Z56HUghV227Z+DBpA8uwXyYMbvtNRh4oT9rYLRZ5tfU9rnLi8TihIKBE4BcQS7wZKLj2MKczOgx8GEb57Bf0EQMCfXeLaaZ6bSkNNuPO7GAhMQ0xVRD3v3/l+zUkW0Hs7ZewF6xRcQfUyrVFUrU1oPbhrnwsWxu5qo3PUyRWj+cyIc17sVIM9l+W7foRkBK6atWjp1B3Lrlm/lQVJJ+/EeuaoydRQ5hfOSB9mJlcKX3BZuVs6pkqIcPRXaTszJzoirdMOVNFV3ID/ttPgLRFGnWDx5WWwLw05KmZImBUXo/Gh7U1qcXBT7WKJtfsiCj9q/cKCnvg2GYMoqO/gGeuWYpiw2NTYAAAAASUVORK5CYII="
									/>
									<Box
										as="img"
										className="absolute w-2 transform top-0 translate-x-8 right-0"
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGPSURBVHgBrVRLUsJAEO2ecaMrPIHhBMraKgk7YJPcADmBeALxBMAN9AasxF1Ey703MJ7ArLCkTNpOTCzzmWTG4q0y/Zvp168DYADy+hY9D49McoRJMEh04QvGJil7JsGAYgQQBUYpuoExPSDFa3KQYOHp3ZtOnj5FMT0ZDGgymYHz+4XU1U3SoihHT4Zwc4i9h8Z56HUghV227Z+DBpA8uwXyYMbvtNRh4oT9rYLRZ5tfU9rnLi8TihIKBE4BcQS7wZKLj2MKczOgx8GEb57Bf0EQMCfXeLaaZ6bSkNNuPO7GAhMQ0xVRD3v3/l+zUkW0Hs7ZewF6xRcQfUyrVFUrU1oPbhrnwsWxu5qo3PUyRWj+cyIc17sVIM9l+W7foRkBK6atWjp1B3Lrlm/lQVJJ+/EeuaoydRQ5hfOSB9mJlcKX3BZuVs6pkqIcPRXaTszJzoirdMOVNFV3ID/ttPgLRFGnWDx5WWwLw05KmZImBUXo/Gh7U1qcXBT7WKJtfsiCj9q/cKCnvg2GYMoqO/gGeuWYpiw2NTYAAAAASUVORK5CYII="
									/>
								</div>
								<div>
									<p className="mb-3 text-sm text-theme-secondary-text">
										Great rating on
									</p>
									<a
										href="https://www.trustpilot.com/review/changenow.io"
										target="_blank"
										className="inline-block"
									>
										<img src="data:image/png;base64,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" />
									</a>
								</div>
							</div>

							<div className="flex-1 max-w-md">{children}</div>
						</>
					)}
				</div>
			</Box>

			<Box
				as="footer"
				className="py-6 w-100 text-center text-xl text-white capitalize font-bold"
				styled={{
					background:
						"linear-gradient(270deg, #CDBAFF 0%, #5E5AE2 97.43%)",
				}}
			>
				Our customers received The displayed amount in 98.7% of all the
				exchanges!
			</Box>
		</Box>
	);
};
