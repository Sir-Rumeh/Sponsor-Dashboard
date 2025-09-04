/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { Metadata } from "next";
import { Suspense, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
	GaugeIcon,
	CheckCircleIcon,
	XCircleIcon,
	Plus,
	EllipsisVertical,
	Search,
	Edit,
	Edit2,
	Edit2Icon,
	Edit3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import EditIconSVG from "@/public/assets/svgs/EditIcon";
import SurveyIconSVG from "@/public/assets/svgs/SurveyIcon";
import NoActiveSurveySVG from "@/public/assets/svgs/NoActiveSurvey";
import CreateSurveyModal from "./create-survey-modal";
import CustomDropdown from "../../components/custom-dropdown";
import { useRouter } from "next/navigation";
import SurveyResultModal from "./survey-result-modal";
import { useUser } from "@/contexts/UserContext";
import { getLoggedInUser } from "@/config/auth-actions";
import { getUserSurveys } from "@/config/survey-actions";

// export const metadata: Metadata = {
// 	title: "SurveyPlus Sponsors Dashboard",
// 	description: "Dashboard for managing and monitoring surveys.",
// };

interface Survey {
	title: string;
	created: string;
	modified: string;
	responses: string;
	questions: number;
	avgTime: string;
	status: number | "Open" | "Closed" | "Draft";
}

const mockSurveys: Survey[] = [
	{
		title: "Creativity feedback survey",
		created: "01 Jun 2025",
		modified: "02 Jun 2025",
		responses: "7/10 Responses",
		questions: 15,
		avgTime: "2.5 min",
		status: "Open",
	},
	{
		title: "Customer relation survey",
		created: "01 Jun 2025",
		modified: "02 Jun 2025",
		responses: "10/10 Responses",
		questions: 10,
		avgTime: "1.5 min",
		status: "Closed",
	},
	{
		title: "Delivery rate feedback survey",
		created: "01 Jun 2025",
		modified: "02 Jun 2025",
		responses: "0/10 Responses",
		questions: 12,
		avgTime: "2 min",
		status: "Draft",
	},
	{
		title: "Standard feedback survey",
		created: "01 Jun 2025",
		modified: "02 Jun 2025",
		responses: "0/10 Responses",
		questions: 9,
		avgTime: "1 min",
		status: "Draft",
	},
];

const getStatusBadge = (status: Survey["status"]) => {
	switch (status) {
		case 1:
			return (
				<Badge className="bg-[#E2FFD9] text-[#249B00] rounded-tl-none rounded-tr-none rounded-bl-sm rounded-br-sm px-3 py-1 text-xs">
					Open
				</Badge>
			);
		case 0:
			return (
				<Badge className="bg-[#FFDEDE] text-[#820000] rounded-tl-none rounded-tr-none rounded-bl-sm rounded-br-sm px-3 py-1 text-xs">
					Closed
				</Badge>
			);
		case null:
			return (
				<Badge className="bg-[#FFF1DB] text-[#FF9D00] rounded-tl-none rounded-tr-none rounded-bl-sm rounded-br-sm px-3 py-1 text-xs">
					Draft
				</Badge>
			);
		default:
			return (
				<Badge className="bg-gray-500 text-white rounded-tl-none rounded-tr-none rounded-bl-sm rounded-br-sm px-3 py-1 text-xs">
					{status}
				</Badge>
			);
	}
};

const getProgressBarColor = (responses: number) => {
	const percentage = (responses / 10) * 100;
	if (percentage === 100) return "bg-[#8B1A10]";
	if (percentage > 0) return "bg-[#249B00]";
	return "bg-gray-200";
};

export default function DashboardPage() {
	const { loggedInUser } = useUser();
	const username = `${loggedInUser?.firstname + " " + loggedInUser?.lastname}`;
	const [isCreateSurveyModal, setIsCreateSurveyModal] = useState<boolean>(false);
	const [isSurveyResultModal, setIsSurveyResultModal] = useState<boolean>(false);
	const [isSurveyLoading, setIsSurveyLoading] = useState<boolean>(false);
	const [surveys, setSurveys] = useState<any[]>();
	const [surveyId, setSurveyId] = useState<number | string>("");
	const router = useRouter();

	const surveyTypes = [
		{ value: "all", label: "All Surveys" },
		{ value: "open", label: "Open" },
		{ value: "closed", label: "Closed" },
		{ value: "draft", label: "Draft" },
	];

	useEffect(() => {
		const fetchSurveys = async () => {
			setIsSurveyLoading(true);
			try {
				const surveyList = await getUserSurveys(1);
				setSurveys(surveyList.data.surveys);
			} catch (err) {
				console.error("Error fetching surveys:", err);
			} finally {
				setIsSurveyLoading(false);
			}
		};
		fetchSurveys();
	}, []);

	return (
		<>
			<div className="bg-gray-100 min-h-screen px-6 xl:px-8 ">
				<div className="flex flex-col">
					<div className="w-full rounded-lg shadow-sm border border-primary/50 mt-6 bg-primary/6 px-8 py-4">
						<h5 className="text-primary/80 dark:text-primary/80 ">{`Hi, ${username ?? ""}`}</h5>
						<div className="flex justify-between items-center">
							<div className="flex flex-col gap-1">
								<p>
									User Entity:{" "}
									<span className="font-semibold">{loggedInUser?.sponsor_type}</span>{" "}
								</p>
								<p>
									Email: <span className="font-semibold">{loggedInUser?.email}</span>{" "}
								</p>
							</div>
							<div className="flex flex-col">
								<Button
									type="button"
									className={cn(
										"bg-transparent border border-primary hover:bg-primary/20  text-primary rounded-lg p-5"
									)}
								>
									<Edit />
									Edit Details
								</Button>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap gap-6 mt-6">
						<Card
							onClick={() => setIsCreateSurveyModal(true)}
							className="bg-foreground rounded-3xl relative cursor-pointer active:scale-[.95]  transition-all disabled:pointer-events-none"
						>
							<CardContent className="flex flex-col items-center justify-center min-w-[220px] h-[100%]">
								<CardTitle className="text-2xl font-bold text-gray-800 mt-2">
									<Plus className="h-6 w-6 text-white" />
								</CardTitle>
								<CardDescription className=" text-white font-bold px-4 ">
									Create Survey
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="bg-primary/6 rounded-lg shadow-sm border border-primary/50 py-5 px-3 flex flex-row  justify-center items-center text-center ">
							<div className="flex flex-col justify-center items-center text-center border-r border-foreground/40 px-12 lg:px-14">
								<CardTitle className="text-2xl font-bold mt-2 text-[#249B00]">10</CardTitle>
								<CardDescription className="text-sm font-medium text-gray-500">
									Open
								</CardDescription>
							</div>

							<div className="flex flex-col justify-center items-center text-center border-r border-foreground/40 px-12 lg:px-14">
								<CardTitle className="text-2xl font-bold mt-2 text-[#8B1A10]">32</CardTitle>
								<CardDescription className="text-sm font-medium text-gray-500">
									Closed
								</CardDescription>
							</div>

							<div className="flex flex-col justify-center items-center text-center px-12 lg:px-14">
								<CardTitle className="text-2xl font-bold mt-2 text-[#FF9D00]">8</CardTitle>
								<CardDescription className="text-sm font-medium text-gray-500">
									Drafts
								</CardDescription>
							</div>
						</Card>
						<div className="flex items-center justify-between flex-grow gap-6">
							<Card className="bg-primary/6 rounded-lg shadow-sm border border-primary/50 py-5 px-5 flex flex-col  justify-center items-center text-center w-full">
								<CardTitle className="text-2xl font-bold text-gray-800 mt-2">95%</CardTitle>
								<CardDescription className="text-sm font-medium text-gray-500">
									Completion Rate
								</CardDescription>
							</Card>
							<Card className="bg-primary/6 rounded-lg shadow-sm border border-primary/50 py-5 px-5 flex flex-col  justify-center items-center text-center w-full">
								<CardTitle className="text-2xl font-bold text-gray-800 mt-2">126</CardTitle>
								<CardDescription className="text-sm font-medium text-gray-500">
									Total Respondents
								</CardDescription>
							</Card>
						</div>
					</div>

					<div className="mt-10">
						<div className="w-full px-1">
							<CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
								<CardTitle className="text-xl">Survey</CardTitle>
								<div className="flex items-center space-x-2">
									<div className="relative rounded-sm w-[300px] bg-foreground/6">
										<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
										<Input placeholder="Search" className="pl-9" />
									</div>
									<CustomDropdown
										options={surveyTypes}
										placeholder="All Surveys"
										selectTriggerClasses="w-[300px] bg-foreground/6"
									/>
								</div>
							</CardHeader>
						</div>
						<div className="">
							<Table>
								<TableBody className="flex flex-col gap-y-5 bg-gray-100 ">
									{!surveys || surveys.length < 1 ? (
										<div className="flex items-center w-full justify-center mt-[10%]">
											<NoActiveSurveySVG />
										</div>
									) : (
										surveys.map((survey, index) => (
											<TableRow
												className="bg-white rounded-lg w-full py-4 flex items-center justify-start gap-5 relative cursor-pointer"
												key={index}
												onClick={() => {
													setSurveyId(survey.id);
													setIsSurveyResultModal(true);
												}}
											>
												<TableCell className="">
													<Button variant="ghost" size="icon">
														<EllipsisVertical className="h-4 w-4" />
													</Button>
												</TableCell>
												<TableCell className="font-medium min-w-[400px]">
													<div className="flex flex-col items-start gap-2 font-bold">
														<span className="flex items-center justify-between w-full">
															<h6 className="text-lg">
																{survey.survey_name}
															</h6>
															<button className="scale-70 cursor-pointer">
																<EditIconSVG />
															</button>
														</span>
														<span className="text-gray-500 font-normal text-xs">
															Created on {survey.created} | Modified{" "}
															{survey.modified}
														</span>
													</div>
												</TableCell>
												<div className="px-3 py-8 border-r border-foreground/40"></div>
												<TableCell className="w-full flex items-center justify-end py-6">
													<div className="flex items-center gap-2 justify-end ">
														<span className="text-gray-500 font-normal">
															{survey.responses}/10
														</span>
														<div className="h-3 w-40 bg-gray-200 rounded-full">
															<div
																className={`h-full rounded-full ${getProgressBarColor(
																	survey.responses
																)}`}
																style={{
																	width: `${
																		(parseInt(survey.responses) /
																			10) *
																		100
																	}%`,
																}}
															/>
														</div>
													</div>
												</TableCell>
												<div className="px-3 py-8 border-r border-foreground/40"></div>
												<TableCell className="w-full flex flex-col items-center justify-center">
													<p className="text-xl font-bold">
														{survey.num_questions}
													</p>
													<p className='text-gray-500 font-normal"'>Questions</p>
												</TableCell>
												<div className="px-3 py-8 border-r border-foreground/40"></div>
												<TableCell className="w-full flex flex-col items-center justify-center">
													<p className=" text-xl font-bold">{survey.avg_time}</p>
													<p className='text-gray-500 font-normal"'>
														Average time spent
													</p>
												</TableCell>
												<TableCell className="absolute -top-2 right-3">
													{getStatusBadge(survey.status)}
												</TableCell>
												<TableCell>
													<i>
														<SurveyIconSVG />
													</i>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</div>
			<CreateSurveyModal isOpen={isCreateSurveyModal} onClose={() => setIsCreateSurveyModal(false)} />
			<SurveyResultModal
				surveyId={surveyId}
				isOpen={isSurveyResultModal}
				onClose={() => setIsSurveyResultModal(false)}
			/>
		</>
	);
}
