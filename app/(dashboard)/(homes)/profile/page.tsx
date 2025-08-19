import type { Metadata } from "next";
import React from "react";
import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import ViewProfileSidebar from "./view-profile-sidebar";

export const metadata: Metadata = {
	title: "View Profile & User Details | Survey Plus Sponsor Admin Dashboard",
	description: "Access detailed user profiles and personal information in the Survey Plus Sponsor Admin Dashboard ",
};

const ViewProfile = () => {
	return (
		<>
			<DashboardBreadcrumb title="View Profile" text="View Profile" />
			<div className="w-full px-8">
				<ViewProfileSidebar />
			</div>
		</>
	);
};
export default ViewProfile;
