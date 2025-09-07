"use client";

import Link from "next/link";
// import { ModeToggle } from "./mode-toggle";

export const Nav = () => {
	return (
		<nav className="app-container flex h-16 items-center justify-between">
			<Link href="/">
				<div className="text-xl font-semibold">Disease Diagnosis</div>
			</Link>
			<div className="flex items-center gap-2">{/* <ModeToggle /> */}</div>
		</nav>
	);
};
