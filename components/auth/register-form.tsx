"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, Loader2, UserRound } from "lucide-react";
import SocialLogin from "./social-login";
import { registerSchema } from "@/lib/zod";
import { useLoading } from "@/contexts/LoadingContext";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LinkSentIcon from "@/public/assets/svgs/LinkSentIcon";
import { verifyEmail } from "@/config/auth-actions";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const RegisterForm = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { loading, setLoading } = useLoading();

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
		},
	});

	const handleRegisterFormSubmit = async (values: z.infer<typeof registerSchema>) => {
		try {
			setLoading(true);
			const res = await verifyEmail(values);
			if (res) {
				setLoading(false);
				toast.success(res.message ?? "Verification email sent...");
				setIsModalOpen(true);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleRegisterFormSubmit)} className="space-y-5">
					<Label htmlFor="email" className="text-black dark:text-white mb-3">
						Verify Email
					</Label>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="relative">
										<Mail className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
										<Input
											{...field}
											type="email"
											placeholder="Email"
											name="email"
											className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 !shadow-none !ring-0"
											disabled={loading}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button type="submit" className="w-full rounded-lg h-[52px] text-sm mt-2" disabled={loading}>
						{loading ? (
							<>
								<Loader2 className="animate-spin h-4.5 w-4.5 mr-2" />
								Loading...
							</>
						) : (
							"Verify"
						)}
					</Button>
				</form>
			</Form>

			{/* Divider */}
			<div className="mt-8 relative text-center before:absolute before:w-full before:h-px before:bg-neutral-300 dark:before:bg-slate-600 before:top-1/2 before:left-0">
				<span className="relative z-10 px-4 bg-white dark:bg-slate-900 text-base">OR</span>
			</div>

			{/* Social Login */}
			<SocialLogin />

			{/* Signup Prompt */}
			<div className="mt-8 text-center text-sm">
				<p>
					Already have an account?{" "}
					<Link href="/auth/login" className="text-primary font-semibold hover:underline">
						Sign In
					</Link>
				</p>
			</div>

			{
				<Dialog
					open={isModalOpen}
					onOpenChange={() => {
						setIsModalOpen(false);
						form.reset();
					}}
				>
					<DialogContent className="sm:max-w-[600px] bg-white z-50 rounded-3xl pb-14 pt-10">
						<DialogTitle>
							<VisuallyHidden>Verification Sent</VisuallyHidden>
						</DialogTitle>
						<div className="mt-2 w-full flex items-center justify-center">
							<LinkSentIcon />
						</div>
						<div className="mt-2 w-full flex flex-col gap-2 items-center justify-center">
							<h6>Verification Link sent to your email</h6>
							<p className="text-lg">Click link to complete sign up</p>
						</div>
					</DialogContent>
				</Dialog>
			}
		</>
	);
};

export default RegisterForm;
