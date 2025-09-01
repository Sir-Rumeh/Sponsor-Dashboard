"use client";

import dynamic from "next/dynamic";
import React from "react";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartOptions: ApexOptions = {
	colors: ["#4f81bd", "#c0504d", "#9bbb59"],
	labels: ["Active", "New", "Total"],

	legend: {
		show: false,
	},
	chart: {
		type: "bar",
		height: 350,
		toolbar: {
			show: false,
		},
	},
	grid: {
		show: true,
		borderColor: "#D1D5DB",
		strokeDashArray: 4, // Use a number for dashed style
		position: "back",
	},
	plotOptions: {
		bar: {
			borderRadius: 2,
			columnWidth: 12,
		},
	},
	dataLabels: {
		enabled: false,
	},
	states: {
		hover: {
			filter: {
				type: "none",
			},
		},
	},
	stroke: {
		show: true,
		width: 0,
		colors: ["transparent"],
	},
	xaxis: {
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	},
	fill: {
		opacity: 1,
	},
};

const chartSeries = [
	{
		name: "Net Profit",
		data: [44, 100, 40, 56, 30, 58, 50],
	},
	{
		name: "Revenue",
		data: [90, 140, 80, 125, 70, 140, 110],
	},
	{
		name: "Free Cash",
		data: [60, 120, 60, 90, 50, 95, 90],
	},
];

const SurveyResultChart = () => {
	return (
		<div className="relative">
			<Chart options={chartOptions} series={chartSeries} type="bar" height={370} width={830} />
			{/* CHART LEGEND */}
			<ul className="flex flex-col space-y-2 items-start justify-center absolute right-4 top-50">
				<li className="flex items-center gap-2 me-7">
					<span className="w-4 h-4 rounded-sm bg-[#4f81bd]"></span>
					<span className="text-secondary-light text-sm font-medium">Plant 1</span>
				</li>
				<li className="flex items-center gap-2 me-7">
					<span className="w-4 h-4 rounded-sm bg-[#c0504d]"></span>
					<span className="text-secondary-light text-sm font-medium">Plant 2</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="w-4 h-4 rounded-sm bg-[#9bbb59]"></span>
					<span className="text-secondary-light text-sm font-medium">Plant 3</span>
				</li>
			</ul>
		</div>
	);
};

export default SurveyResultChart;
