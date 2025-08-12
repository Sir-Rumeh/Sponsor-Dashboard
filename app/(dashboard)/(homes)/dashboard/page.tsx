/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GaugeIcon, CheckCircleIcon, XCircleIcon, Plus, EllipsisVertical, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
	title: "SurveyPlus Dashboard",
	description: "Dashboard for managing and monitoring surveys.",
};

interface Survey {
	title: string;
	created: string;
	modified: string;
	responses: string;
	questions: number;
	avgTime: string;
	status: "Open" | "Closed" | "Draft";
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
		case "Open":
			return <Badge className="bg-green-500 text-white rounded-full px-3 py-1 text-xs">Open</Badge>;
		case "Closed":
			return <Badge className="bg-red-500 text-white rounded-full px-3 py-1 text-xs">Closed</Badge>;
		case "Draft":
			return <Badge className="bg-yellow-500 text-white rounded-full px-3 py-1 text-xs">Draft</Badge>;
		default:
			return <Badge className="bg-gray-500 text-white rounded-full px-3 py-1 text-xs">{status}</Badge>;
	}
};

const getProgressBarColor = (responses: string) => {
	const [completed, total] = responses.split("/").map((s) => parseInt(s, 10));
	const percentage = (completed / total) * 100;
	if (percentage === 100) return "bg-green-500";
	if (percentage > 0) return "bg-blue-500";
	return "bg-gray-200";
};

export default function DashboardPage() {
	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="flex flex-col">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
					<Card className="bg-white rounded-lg shadow-sm border border-primary/20">
						<CardContent className="flex items-center justify-between p-6">
							<div className="flex items-center gap-2">
								<Plus className="h-6 w-6 text-primary" />
								<Button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg">
									Create Survey
								</Button>
							</div>
						</CardContent>
					</Card>
					<Card className="bg-white rounded-lg shadow-sm border border-primary/20 p-6 flex flex-col justify-center items-center text-center">
						<CardDescription className="text-sm font-medium text-gray-500">Open</CardDescription>
						<CardTitle className="text-3xl font-bold text-gray-800 mt-2">10</CardTitle>
					</Card>
					<Card className="bg-white rounded-lg shadow-sm border border-primary/20 p-6 flex flex-col justify-center items-center text-center">
						<CardDescription className="text-sm font-medium text-gray-500">Closed</CardDescription>
						<CardTitle className="text-3xl font-bold text-gray-800 mt-2">32</CardTitle>
					</Card>
					<Card className="bg-white rounded-lg shadow-sm border border-primary/20 p-6 flex flex-col justify-center items-center text-center">
						<CardDescription className="text-sm font-medium text-gray-500">Draft</CardDescription>
						<CardTitle className="text-3xl font-bold text-gray-800 mt-2">8</CardTitle>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
					<Card className="bg-white rounded-lg shadow-sm border border-primary/20 p-6 flex flex-col justify-center items-center text-center">
						<CardDescription className="text-sm font-medium text-gray-500">
							Completion Rate
						</CardDescription>
						<CardTitle className="text-3xl font-bold text-gray-800 mt-2">95%</CardTitle>
					</Card>
					<Card className="bg-white rounded-lg shadow-sm border border-primary/20 p-6 flex flex-col justify-center items-center text-center">
						<CardDescription className="text-sm font-medium text-gray-500">
							Total Respondents
						</CardDescription>
						<CardTitle className="text-3xl font-bold text-gray-800 mt-2">126</CardTitle>
					</Card>
				</div>

				<div className="mt-6">
					<Card className="bg-white rounded-lg shadow-sm border border-primary/20 p-6">
						<CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
							<CardTitle className="text-xl">Survey</CardTitle>
							<div className="flex items-center space-x-2">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
									<Input placeholder="Search" className="pl-9" />
								</div>
								<Select>
									<SelectTrigger className="w-[180px] rounded-lg">
										<SelectValue placeholder="All Surveys" />
									</SelectTrigger>
									<SelectContent className="rounded-lg bg-white">
										<SelectItem value="all">All Surveys</SelectItem>
										<SelectItem value="open">Open</SelectItem>
										<SelectItem value="closed">Closed</SelectItem>
										<SelectItem value="draft">Draft</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardHeader>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Survey Title</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Responses</TableHead>
									<TableHead>Questions</TableHead>
									<TableHead>Average Time</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{mockSurveys.map((survey, index) => (
									<TableRow key={index}>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												{survey.title}
												<span className="text-gray-500 text-xs">
													Created on {survey.created} | Modified{" "}
													{survey.modified}
												</span>
											</div>
										</TableCell>
										<TableCell>{getStatusBadge(survey.status)}</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<span>{survey.responses}</span>
												<div className="h-2 w-20 bg-gray-200 rounded-full">
													<div
														className={`h-full rounded-full ${getProgressBarColor(
															survey.responses
														)}`}
														style={{
															width: `${
																(parseInt(
																	survey.responses.split("/")[0]
																) /
																	parseInt(
																		survey.responses.split("/")[1]
																	)) *
																100
															}%`,
														}}
													/>
												</div>
											</div>
										</TableCell>
										<TableCell>{survey.questions}</TableCell>
										<TableCell>{survey.avgTime}</TableCell>
										<TableCell>
											<Button variant="ghost" size="icon">
												<EllipsisVertical className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Card>
				</div>
			</div>
		</div>
	);
}
