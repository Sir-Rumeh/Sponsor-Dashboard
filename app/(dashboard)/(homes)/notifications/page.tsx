"use client";

import React from "react";
import { format } from "date-fns";
import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";

// Define a type for a single notification
interface Notification {
	id: string;
	title: string;
	description: string;
	time: Date;
}

// Dummy data to simulate a list of notifications
const notifications: Notification[] = [
	{
		id: "1",
		title: "Your survey 'Q1-2024 Customer Feedback' is live!",
		description: "Your survey has been published and is ready for respondents.",
		time: new Date("2024-08-15T10:00:00Z"),
	},
	{
		id: "2",
		title: "New response received",
		description: "A new response has been submitted for your 'Product Research' survey.",
		time: new Date("2024-08-15T09:30:00Z"),
	},
	{
		id: "3",
		title: "Your account has been updated",
		description: "Your profile information was successfully changed.",
		time: new Date("2024-08-14T15:45:00Z"),
	},
	{
		id: "4",
		title: "Password changed successfully",
		description: "Your password was recently changed. If this wasn't you, please contact support.",
		time: new Date("2024-08-14T11:20:00Z"),
	},
	{
		id: "5",
		title: "Upcoming survey expiration",
		description: "Your 'Team Morale' survey is set to expire in 3 days.",
		time: new Date("2024-08-13T08:00:00Z"),
	},
];

const NotificationsList = () => {
	return (
		<div className="w-full px-6 xl:px-8">
			<DashboardBreadcrumb title="Notification Alert" text="Notification Alert" />

			<div className="flex flex-col items-center w-full">
				<div className="w-full  p-6 bg-white rounded-xl border border-border shadow-sm">
					<h2 className="text-2xl font-bold mb-6 text-gray-800">Your Notifications</h2>

					<div className="space-y-4">
						{notifications.map((notification) => (
							<div
								key={notification.id}
								className="flex items-start justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
							>
								<div className="flex-1">
									<h4 className="text-lg font-semibold text-gray-900">
										{notification.title}
									</h4>
									<p className="text-sm text-gray-600 mt-1">{notification.description}</p>
								</div>
								<div className="text-right ml-4 flex-shrink-0">
									<span className="text-xs text-gray-500">
										{format(notification.time, "MMM d, yyyy h:mm a")}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationsList;
