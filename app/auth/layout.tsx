"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { ClientOnly } from "../client-only";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// <ClientOnly>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<div className="min-h-screen w-full">{children}</div>
				<Toaster position="top-right" reverseOrder={false} />
			</ThemeProvider>
		// </ClientOnly>
	);
}
