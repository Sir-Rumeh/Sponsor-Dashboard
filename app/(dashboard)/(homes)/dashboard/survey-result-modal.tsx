import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { Suspense, useEffect, useState } from "react";
import StatsCard from "./stats-card";
import SurveyResultChart from "./survey-result-chart";
import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import LoadingSkeleton from "@/components/loading-skeleton";
import RespondentsCard from "./respondents";
import PieChartComponent from "./survey-pie-chart";
import { getSurveyRespondents, viewSurveyDetails } from "@/config/survey-actions";

interface SurveyResultModalProps {
	isOpen: boolean;
	onClose: () => void;
	surveyId: string | number;
}

const SurveyResultModal: React.FC<SurveyResultModalProps> = ({ isOpen, onClose, surveyId }) => {
	const [surveyDetails, setSurveyDetails] = useState<any>();
	const [surveyRespondents, setSurveyRespondents] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!isOpen) return;
		setIsLoading(true);

		const fetchSurveyDetails = async () => {
			try {
				const res = await viewSurveyDetails(surveyId);
				setSurveyDetails(res.data);
			} catch (err) {
				console.error("Error fetching surveys:", err);
			} finally {
				setIsLoading(false);
			}
		};
		const fetchSurveyRespondents = async () => {
			try {
				const res = await getSurveyRespondents(surveyId);
				setSurveyRespondents(res.data.users);
			} catch (err) {
				console.error("Error fetching surveys:", err);
			} finally {
				setIsLoading(false);
			}
		};
		Promise.all([fetchSurveyDetails(), fetchSurveyRespondents()]);
	}, [isOpen, surveyId]);

	return (
		<>
			<Dialog open={isOpen} onOpenChange={() => onClose()}>
				<DialogContent className="sm:max-w-[1600px] bg-transaprent z-50 rounded-sm">
					<div className="mt-5 rounded-md pt-4 px-3 bg-primary/30">
						<>
							<div className="flex flex-wrap items-center justify-between gap-2 mb-6">
								<h6 className="text-2xl font-semibold text-white">Survey Result</h6>
								<Breadcrumb>
									<BreadcrumbList>
										<BreadcrumbItem className="">
											<BreadcrumbLink
												onClick={(e) => {
													e.preventDefault();
													onClose();
												}}
												className="flex items-center gap-2 font-medium text-base text-gray-300 hover:text-primary dark:text-white dark:hover:text-primary cursor-pointer"
											>
												<House size={16} />
												Dashboard
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem className="text-base">
											<BreadcrumbPage className="text-white">
												{"Survey Result"}
											</BreadcrumbPage>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
							</div>
						</>
					</div>
					<section className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
							<StatsCard
								totalRespondents={surveyDetails?.total_responds}
								neededRespondents={surveyDetails?.needed_responds}
							/>
							<div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md">
								<SurveyResultChart />
							</div>
						</div>

						<section className="md:col-span-1 grid grid-cols-1 gap-6">
							<div className="bg-white p-6 rounded-lg shadow-md min-h-[350px]">
								<h3 className="text-lg font-semibold mb-4">Market Share</h3>
								{/* <PieChartComponent /> */}
							</div>
							<div className="bg-white rounded-lg shadow-md h-[20rem] overflow-y-scroll">
								<Suspense fallback={<LoadingSkeleton height="h-64" text="Loading..." />}>
									<RespondentsCard respondents={surveyRespondents} />
								</Suspense>
							</div>
						</section>
					</section>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default SurveyResultModal;
