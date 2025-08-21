"use client";

import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import AuthImage from "@/public/assets/images/auth/auth-img.png";
import ThemeLogo from "@/components/shared/theme-logo";
import { StaticImg } from "@/types/static-image";
import LoginForm from "@/components/auth/login-form";

const metadata: Metadata = {
	title: "Login & Create Account | SurveyPlus Sponsors Admin Dashboard",
	description: "Login to user account and get started with the SurveyPlus Sponsors Admin Dashboard",
};

const authImage: StaticImg = {
	image: AuthImage,
};

const Login = () => {
	return (
		<section className="bg-white dark:bg-slate-900 flex flex-wrap min-h-screen">
			{/* Left Image */}
			<div className="lg:w-1/2 hidden lg:block bg-primary/10">
				<div className="flex items-center justify-center h-screen flex-col">
					<Image src={authImage.image} alt="Auth Illustration" className="object-cover w-full" />
				</div>
			</div>

			{/* Right Form */}
			<div className="lg:w-1/2 w-full py-8 px-6 flex flex-col justify-center">
				<div className="lg:max-w-[464px] w-full mx-auto">
					{/* Logo and heading */}
					<div>
						<div className="">
							<ThemeLogo />
						</div>
						<h6 className="text-primary mb-2.5 text-center font-bold">Sponsor Sign in</h6>

						<h4 className="font-semibold mb-3">Sign In to your Account</h4>
						<p className="mb-8 text-secondary-light text-lg">
							Welcome back! Please enter your details.
						</p>
					</div>

					{/* Login Form */}
					<LoginForm />
				</div>
			</div>
		</section>
	);
};

export default Login;
