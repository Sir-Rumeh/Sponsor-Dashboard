// components/PieChartComponent.tsx

"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const generateUniqueColors = (count: number) => {
	const colors = [];
	for (let i = 0; i < count; i++) {
		colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
	}
	return colors;
};

const chartData = [
	{ name: "Vigorous Exercise Company", value: 400 },
	{ name: "Customer Bicycle", value: 300 },
	{ name: "Delivery Rate", value: 250 },
	{ name: "Market Share", value: 200 },
	{ name: "Client Satisfaction", value: 278 },
	{ name: "Product Sales", value: 189 },
	{ name: "Service Usage", value: 239 },
	{ name: "Website Traffic", value: 349 },
	{ name: "Customer Acquisition", value: 450 },
	{ name: "User Retention", value: 380 },
];

const PieChartComponent = () => {
	const [colors, setColors] = useState<string[]>([]);

	useEffect(() => {
		setColors(generateUniqueColors(chartData.length));
	}, []);

	return (
		<div className="w-full">
			<ChartContainer config={{}} className="">
				<PieChart width={500} height={500} className="p-2">
					<Pie
						data={chartData}
						dataKey="value"
						nameKey="name"
						cx="100%"
						cy="100%"
						outerRadius={150}
						label
						labelLine={false}
						className="scale-[60] translate-x-3 translate-y-4"
					>
						{chartData.map((_entry, index) => (
							<Cell key={`cell-${index}`} fill={colors[index]} />
						))}
					</Pie>
					<Tooltip content={<ChartTooltipContent />} />
					<Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{ right: 0 }} />
				</PieChart>
			</ChartContainer>
		</div>
	);
};

export default PieChartComponent;
