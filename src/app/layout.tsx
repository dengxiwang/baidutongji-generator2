import Provider from "@/components/provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "百度统计代码生成器 - 浏览器插件版",
	description:
		"本工具用于辅助生成百度统计插件在file和chrome-extension等协议环境下【如：electron、chrome extension】能正常上报统计信息的本地插件文件。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Provider>
					<Toaster />
					{children}
				</Provider>
			</body>
		</html>
	);
}
