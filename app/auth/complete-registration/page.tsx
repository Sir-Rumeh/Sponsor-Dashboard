"use client";

import type { Metadata } from "next";
import React, { useRef, useState, useTransition } from "react";
import Image from "next/image";
import AuthImage from "@/public/assets/images/auth/auth-img.png";
import ThemeLogo from "@/components/shared/theme-logo";
import { StaticImg } from "@/types/static-image";
import LoginForm from "@/components/auth/login-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { completeRegisterSchema } from "@/lib/zod";
import z from "zod";
import { useLoading } from "@/contexts/LoadingContext";
import { handleLoginAction } from "@/components/auth/actions/login";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const metadata: Metadata = {
	title: "Login & Create Account | SurveyPlus Sponsors Admin Dashboard",
	description: "Login to user account and get started with the SurveyPlus Sponsors Admin Dashboard",
};

const ConpleteRegistration = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { loading, setLoading } = useLoading();
	const formRef = useRef<HTMLFormElement>(null);

	const form = useForm<z.infer<typeof completeRegisterSchema>>({
		resolver: zodResolver(completeRegisterSchema),
		defaultValues: {
			name: "",
			sponsorType: "",
			email: "",
			phoneNumber: "",
			state: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = (values: z.infer<typeof completeRegisterSchema>) => {
		setLoading(true);

		startTransition(async () => {
			try {
				if (!formRef.current) return;

				const formData = new FormData(formRef.current);
				const res = await handleLoginAction(formData);

				if (res?.error) {
					toast.error(res.error);
				} else {
					await signIn("credentials", {
						redirect: true,
						email: "wowdash@gmail.com",
						password: "Pa$$w0rd!",
						callbackUrl: "/dashboard",
					});
					toast.success("Signup successful!");
				}
			} catch (error) {
				toast.error("Something went wrong. Please try again.");
			} finally {
				setLoading(false);
			}
		});
	};
	return (
		<section className="p-10 bg-gradient-to-tr from-[#A81A4D] to-[#D4B4E3] min-h-screen w-full flex items-center justify-center">
			<section className="bg-white dark:bg-slate-900 flex flex-wrap rounded-xl p-10 w-full">
				<div className="w-full flex flex-col items-center">
					<div className="">
						<ThemeLogo />
					</div>
					<h6 className="text-primary text-center font-bold">Complete Sponsor Sign up</h6>
				</div>
				<div className="w-full flex justify-center">
					<Form {...form}>
						<form
							ref={formRef}
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-5 w-full max-w-3xl"
						>
							{/* Email Field */}
							<div className="w-full">
								<Label htmlFor="email" className="text-black dark:text-white mb-3">
									Name:
								</Label>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="relative">
													<Mail className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
													<Input
														{...field}
														type="name"
														placeholder="Deefrent Media"
														name="name"
														className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 !shadow-none !ring-0"
														disabled={loading}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="w-full">
								<Label htmlFor="email" className="text-black dark:text-white mb-3">
									Sponsor Type:
								</Label>
								<FormField
									control={form.control}
									name="sponsorType"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="relative">
													<Mail className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
													<Input
														{...field}
														type="sponsorType"
														placeholder="Business Organisation"
														name="sponsorType"
														className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 !shadow-none !ring-0"
														disabled={loading}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="w-full">
								<Label htmlFor="email" className="text-black dark:text-white mb-3">
									Email:
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
														placeholder="Deefrent@deefrent.com"
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
							</div>

							<div className="w-full">
								<Label htmlFor="email" className="text-black dark:text-white mb-3">
									Phone Number:
								</Label>
								<FormField
									control={form.control}
									name="phoneNumber"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="relative">
													<Mail className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
													<Input
														{...field}
														type="phoneNumber"
														placeholder="+234 80 8745 2365"
														name="phoneNumber"
														className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 !shadow-none !ring-0"
														disabled={loading}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="w-full">
								<Label htmlFor="email" className="text-black dark:text-white mb-3">
									State:
								</Label>
								<FormField
									control={form.control}
									name="state"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="relative">
													<Mail className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
													<Input
														{...field}
														type="state"
														placeholder="Lagos State"
														name="state"
														className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 !shadow-none !ring-0"
														disabled={loading}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="w-full">
								<Label htmlFor="password" className="text-black dark:text-white mb-3">
									Password
								</Label>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="relative">
													<Lock className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
													<Input
														{...field}
														type={showPassword ? "text" : "password"}
														placeholder="Password"
														name="password"
														className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 !shadow-none !ring-0"
														disabled={loading}
													/>
													<Button
														type="button"
														onClick={() => setShowPassword(!showPassword)}
														className="absolute right-4 top-1/2 transform -translate-y-1/2 !p-0 bg-transparent hover:bg-transparent text-muted-foreground h-[unset]"
													>
														{showPassword ? (
															<EyeOff className="w-5 h-5" />
														) : (
															<Eye className="w-5 h-5" />
														)}
													</Button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="w-full">
								<Label htmlFor="password" className="text-black dark:text-white mb-3">
									Confirm Password
								</Label>
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="relative">
													<Lock className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
													<Input
														{...field}
														type={showPassword ? "text" : "password"}
														placeholder="Password"
														name="confirmPassword"
														className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 !shadow-none !ring-0"
														disabled={loading}
													/>
													<Button
														type="button"
														onClick={() => setShowPassword(!showPassword)}
														className="absolute right-4 top-1/2 transform -translate-y-1/2 !p-0 bg-transparent hover:bg-transparent text-muted-foreground h-[unset]"
													>
														{showPassword ? (
															<EyeOff className="w-5 h-5" />
														) : (
															<Eye className="w-5 h-5" />
														)}
													</Button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Submit Button */}
							<Button
								type="submit"
								className="w-full rounded-lg h-[52px] text-sm mt-2"
								disabled={loading || isPending}
							>
								{loading || isPending ? (
									<>
										<Loader2 className="animate-spin h-4.5 w-4.5 mr-2" />
										Signing up...
									</>
								) : (
									"Sign Up"
								)}
							</Button>
						</form>
					</Form>
				</div>
			</section>
		</section>
	);
};

export default ConpleteRegistration;
