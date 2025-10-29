"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/public/assets/images/logo-white.png";

function ThemeLogo() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Don't render until mounted to avoid hydration mismatch or wrong theme
	if (!isMounted) return null;

	return (
		<div className="w-full flex items-center justify-center">
			<Image src={Logo} alt="Logo" width={168} height={40} priority />
		</div>
	);
}

export default ThemeLogo;
