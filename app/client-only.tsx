// components/ClientOnly.tsx
"use client";

import { useState, useEffect } from "react";

/**
 * A wrapper component that only renders its children after it has mounted
 * on the client side, effectively preventing any child from running during SSR.
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		// Check if the code is running in the browser
		if (typeof window !== "undefined") {
			setHasMounted(true);
		}
	}, []);

	// During SSR (on the server), hasMounted is false, so it returns null.
	// On the client, after useEffect runs, it returns the children.
	if (!hasMounted) {
		// Optionally return a minimal placeholder/loading state to prevent layout shift
		return null;
	}

	return <>{children}</>;
}
