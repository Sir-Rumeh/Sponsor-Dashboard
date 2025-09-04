"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { handleProfileUpdate } from "./actions/handleProfileUpdate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AvatarUpload from "./avatar-upload";
import { useUser } from "@/contexts/UserContext";
import EditIconSVG from "@/public/assets/svgs/EditIcon";

const ViewProfileSidebar = () => {
	const { loggedInUser } = useUser();
	return (
		<div className="user-grid-card relative border border-slate-200 dark:border-slate-600 rounded-2xl overflow-hidden bg-white dark:bg-[#273142] h-full">
			<div
				className="w-full h-[200px] bg-cover bg-center relative"
				style={{ backgroundImage: "url('assets/images/user-grid/user-grid-bg1.png')" }}
			>
				<div className="text-center border-b border-slate-200 dark:border-slate-600 absolute left-1/2 -translate-x-1/2 top-[100px] w-full">
					<div className="flex justify-center items-center relative">
						<AvatarUpload />
					</div>
					<h6 className="mb-0 mt-4">{`${loggedInUser?.account_num}`}</h6>
					<span className="text-secondary-light mb-4">{`${loggedInUser?.email}`}</span>
				</div>
			</div>

			<div className="mt-[200px]">
				<div className="mt-6">
					<div className="col-span-12 lg:col-span-8">
						<Card className="card">
							<CardContent className="px-0">
								<div>
									<form action={handleProfileUpdate}>
										{/* <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 md:px-6"> */}
										<div className="flex flex-col items-center gap-x-6 md:px-6">
											<div className="w-full max-w-xl relative">
												<div className="mb-5">
													<Label
														htmlFor="basicInput"
														className="text-black dark:text-white mb-3"
													>
														Full Name:
													</Label>
													<Input
														name="name"
														type="text"
														id="name"
														value={`${loggedInUser?.firstname} ${loggedInUser?.lastname}`}
														placeholder="Enter Full Name"
														className="disabled:bg-gray-100 disabled:opacity-100 disabled:border-gray-400 border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-md !shadow-none !ring-0"
													/>
												</div>
												{/* <button className="scale-70 cursor-pointer absolute">
													<EditIconSVG />
												</button> */}
											</div>
											<div className="w-full max-w-xl relative">
												<div className="mb-5">
													<Label
														htmlFor="sponsorType"
														className="text-black dark:text-white mb-3"
													>
														Sponsor Type:
													</Label>
													<Input
														name="sponsorType"
														type="text"
														id="sponsorType"
														value={`${loggedInUser?.sponsor_type}`}
														placeholder="Enter Sponsor Type"
														disabled
														className="disabled:bg-gray-100 disabled:opacity-100 disabled:border-gray-400 border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-md !shadow-none !ring-0"
													/>
												</div>
											</div>
											<div className="w-full max-w-xl relative">
												<div className="mb-5">
													<Label
														htmlFor="email"
														className="text-black dark:text-white mb-3"
													>
														Email:
													</Label>
													<Input
														name="email"
														type="text"
														id="email"
														value={` ${loggedInUser?.email}`}
														placeholder="Enter Email"
														disabled
														className="disabled:bg-gray-100 disabled:opacity-100 disabled:border-gray-400 border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-md !shadow-none !ring-0"
													/>
												</div>
											</div>
											<div className="w-full max-w-xl relative">
												<div className="mb-5">
													<Label
														htmlFor="number"
														className="text-black dark:text-white mb-3"
													>
														Phone Number:
													</Label>
													<Input
														name="number"
														type="tel"
														id="number"
														value={` ${loggedInUser?.phone_number}`}
														placeholder="Enter phone number"
														disabled
														className="disabled:bg-gray-100 disabled:opacity-100 disabled:border-gray-400 border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-md !shadow-none !ring-0"
													/>
												</div>
											</div>
											<div className="w-full max-w-xl relative">
												<div className="mb-5">
													<Label
														htmlFor="state"
														className="text-black dark:text-white mb-3"
													>
														State:
													</Label>
													<Input
														name="state"
														type="text"
														id="state"
														value={`${loggedInUser?.state}`}
														placeholder="Enter State"
														disabled
														className="disabled:bg-gray-100 disabled:opacity-100 disabled:border-gray-400 border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-md !shadow-none !ring-0"
													/>
												</div>
											</div>
											<div className="w-full max-w-xl relative">
												<div className="mb-5">
													<Label
														htmlFor="state"
														className="text-black dark:text-white mb-3"
													>
														Lga:
													</Label>
													<Input
														name="lga"
														type="text"
														id="lga"
														value={`${loggedInUser?.lga}`}
														placeholder="Enter Lga"
														disabled
														className="disabled:bg-gray-100 disabled:opacity-100 disabled:border-gray-400 border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-md !shadow-none !ring-0"
													/>
												</div>
											</div>
										</div>
									</form>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewProfileSidebar;
