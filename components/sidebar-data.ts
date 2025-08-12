import { House, UsersRound, Bell } from "lucide-react";

export const data = {
	navMain: [
		// 		{
		// 	label: "Pages",
		// },
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: House,
			isActive: true,
		},
		{
			title: "Profile",
			url: "/profile",
			icon: UsersRound,
			isActive: true,
		},
		{
			title: "Notifications",
			url: "/notifications",
			icon: Bell,
			isActive: true,
		},
	],
};
