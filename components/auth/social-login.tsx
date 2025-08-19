// ============================================= Server side way start =======================================
import React, { useState } from "react";
import GithubIcon from "@/public/assets/images/icons/github-icon.png";
import GoogleIcon from "@/public/assets/images/icons/google-icon.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { doSocialLogin } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useLoading } from "@/contexts/LoadingContext";

const SocialLogin = () => {
	const { loading, setLoading } = useLoading();

	const [loadingButtonProvider, setLoadingButtonProvider] = useState<null | "google" | "github">(null);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);

		const form = e.currentTarget;
		const clickedButton = (document.activeElement as HTMLButtonElement)?.value;
		setLoadingButtonProvider(clickedButton === "google" || clickedButton === "github" ? clickedButton : null);

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	return (
		<form className="mt-8 flex items-center gap-3 w-full" action={doSocialLogin} onSubmit={handleFormSubmit}>
			{/* Google Button */}
			<Button
				className="w-full font-semibold text-neutral-600 hover:text-neutral-600 dark:text-neutral-200 py-6 px-2 border border-neutral-600/50 rounded-lg text-sm flex items-center justify-center gap-3 line-height-1 hover:border-primary/50 hover:bg-primary/4 disabled:opacity-80"
				variant="outline"
				type="submit"
				name="action"
				value="google"
				disabled={loadingButtonProvider === "google" || loading}
			>
				{loadingButtonProvider === "google" ? (
					<>
						<Loader2 className="animate-spin h-4.5 w-4.5" />
						Loading...
					</>
				) : (
					<>
						<Image src={GoogleIcon} alt="google" width={18} height={18} />
						Google
					</>
				)}
			</Button>
		</form>
	);
};

export default SocialLogin;
// ============================================= Server side way end =======================================
