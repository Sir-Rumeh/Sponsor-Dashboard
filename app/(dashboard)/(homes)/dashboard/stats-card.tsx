"use client";
import React from "react";
import { Users, UserCheck, DollarSign, BarChart3, LineChart, TrendingUp, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CardSmallChart from "@/components/charts/card-small-chart";
import AverageTimeIcon from "@/public/assets/svgs/AverageTimeIcon";

interface StatItem {
	id: string;
	title: string;
	value: string;
	change: string;
	changeColor: "success" | "danger";
	gradientFrom: string;
	bgCircle: string;
	icon: LucideIcon;
	chartId: string;
}

const StatsCard = ({
	totalRespondents,
	neededRespondents,
}: {
	totalRespondents: number;
	neededRespondents: number;
}) => {
	const stats: StatItem[] = [
		{
			id: "Total Respondents",
			title: "Total Respondents",
			value: totalRespondents?.toString(),
			change: "5",
			changeColor: "success",
			gradientFrom: "from-purple-600/10",
			bgCircle: "#8252e9",
			icon: BarChart3,
			chartId: "conversion-user-chart",
		},
		{
			id: "Average Time Spent",
			title: "Average Time Spent",
			value: "2.5 mins",
			change: "2.5 mins",
			changeColor: "success",
			gradientFrom: "from-pink-600/10",
			bgCircle: "#de3ace",
			icon: AverageTimeIcon,
			chartId: "leads-chart",
		},
		{
			id: "Completion Rate",
			title: "Completion Rate",
			value: `${((totalRespondents / neededRespondents) * 100)?.toString()}%`,
			change: "90%",
			changeColor: "success",
			gradientFrom: "from-cyan-600/10",
			bgCircle: "#00b8f2",
			icon: TrendingUp,
			chartId: "total-profit-chart",
		},
	];
	return (
		<>
			{stats.map((item) => {
				const Icon = item.icon;
				const colorClass =
					item.changeColor === "success"
						? "bg-green-100 dark:bg-green-600/25 text-green-600 dark:text-green-400"
						: "bg-red-100 dark:bg-red-600/25 text-red-600 dark:text-red-400";

				return (
					<Card
						key={item.id}
						className={`card !px-4 !py-5 shadow-none rounded-lg !border border-gray-200 dark:border-neutral-600 h-auto bg-gradient-to-l ${item.gradientFrom} to-bg-white w-full`}
					>
						<CardContent className="p-0">
							<div className="flex flex-wrap items-center justify-between gap-1 mb-2 ">
								<div className="flex items-center gap-2">
									<span
										style={{ backgroundColor: item.bgCircle }}
										className={`w-[44px] h-[44px] text-white flex justify-center items-center rounded-full ${item.bgCircle}`}
									>
										<Icon className="w-6 h-6" />
									</span>
									<div>
										<span className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
											{item.title}
										</span>
										<h6 className="font-semibold">{item.value}</h6>
									</div>
								</div>
								<div className="remove-tooltip-title rounded-tooltip-value remove-tooltip-marker">
									<CardSmallChart chartColor={item.bgCircle} />
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}
		</>
	);
};

export default StatsCard;
