"use client";

import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import RegisterImage from "@/public/assets/images/auth/register-img.png";
import ThemeLogo from "@/components/shared/theme-logo";
import { StaticImg } from "@/types/static-image";
import RegisterForm from "@/components/auth/register-form";

const registerImage: StaticImg = {
	image: RegisterImage,
};

const Register = () => {
	return (
		<>
			<section className="bg-white dark:bg-slate-900 flex flex-wrap min-h-screen">
				{/* Left Image */}
				<div className="lg:w-1/2 hidden lg:block bg-primary/10">
					<div className="flex items-center justify-center h-screen flex-col">
						<Image
							src={registerImage.image}
							alt="Auth Illustration"
							className="object-cover w-full"
						/>
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
							<h6 className="text-primary mb-2.5 text-center font-bold">Sponsor Sign up</h6>

							<h4 className="font-semibold mb-3">Register your Account</h4>
							<p className="mb-8 text-secondary-light text-lg">Please enter your details.</p>
						</div>

						{/* Register Form */}
						<RegisterForm />
					</div>
				</div>
			</section>
		</>
	);
};

export default Register;
