import type { Metadata } from "next";
import { Work_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const workSans = Work_Sans({
	variable: "--font-work-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Disease Diagnosis",
	description: "Predicting common diseases from the symptoms and demographics",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${workSans.variable} ${geistMono.variable} antialiased font-sans`}
			>
				<Nav />
				{children}
			</body>
		</html>
	);
}
