/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { Metadata } from "next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Plus, Save, SquareArrowUpRight, Trash2, CheckCircle, XCircle } from "lucide-react";
import ArrowBackIcon from "@/public/assets/svgs/ArrowBackIcon";
import { useRouter } from "next/navigation";
import DraftIcon from "@/public/assets/svgs/DraftIcon";
import ImportIcon from "@/public/assets/svgs/ImportIcon";
import CheckoutIcon from "@/public/assets/svgs/CheckoutIcon";
import CustomDropdown from "../../components/custom-dropdown";

// export const metadata: Metadata = {
// 	title: "Create Survey - SurveyPlus",
// 	description: "Create and design a new survey for your respondents.",
// };

interface Question {
	id: number;
	questionText: string;
	answerText: string;
	type: "Single line text" | "Radio mode" | "Checkbox" | "Dropdown";
}

const CreateSurveyPage = () => {
	const router = useRouter();
	const [surveyTitle, setSurveyTitle] = useState("Creativity feedback survey");
	const [questions, setQuestions] = useState<Question[]>([
		{
			id: 1,
			questionText: "Enter question here",
			answerText: "Enter answer here",
			type: "Single line text",
		},
	]);

	const handleAddQuestion = () => {
		setQuestions([
			...questions,
			{
				id: questions.length + 1,
				questionText: "",
				answerText: "",
				type: "Single line text",
			},
		]);
	};

	const handleDeleteQuestion = (id: number) => {
		setQuestions(questions.filter((question) => question.id !== id));
	};

	const handleQuestionChange = (id: number, field: keyof Question, value: any) => {
		setQuestions(questions.map((question) => (question.id === id ? { ...question, [field]: value } : question)));
	};

	const modeTypes = [
		{ value: "Questionaire mode", label: "Questionaire Mode" },
		{ value: "open", label: "Open" },
	];

	const questionTypes = [
		{ value: "Single line text", label: "Single line text" },
		{ value: "Radio mode", label: "Radio mode" },
		{ value: "Checkbox", label: "Checkbox" },
		{ value: "Dropdown", label: "Dropdown" },
	];

	return (
		<div className="flex flex-col min-h-screen px-6 xl:px-8 bg-gray-100 dark:bg-gray-900">
			{/* Top Buttons Section */}
			<div className="flex justify-between items-center mb-6">
				<Button
					onClick={() => router.push("/dashboard")}
					variant="ghost"
					className="flex items-center gap-2 text-black text-xl hover:bg-primary/5 dark:text-primary dark:hover:bg-primary/5"
				>
					<ArrowBackIcon /> Back
				</Button>
				<div className="flex gap-4">
					<Button
						variant="outline"
						className="flex items-center gap-2 bg-transparent border border-primary hover:bg-primary/20  text-primary rounded-lg p-5 text-md"
					>
						<DraftIcon /> Save to draft
					</Button>
					<Button
						variant="outline"
						className="flex items-center gap-2 bg-transparent border border-primary hover:bg-primary/20  text-primary rounded-lg p-5 text-md"
					>
						<ImportIcon className="scale-150" /> Import template
					</Button>
					<Button className="flex items-center p-5 gap-2 bg-primary hover:bg-primary/90 text-white text-md">
						<CheckoutIcon /> Proceed to checkout
					</Button>
				</div>
			</div>

			{/* Title and Question Mode Section */}
			<div className="w-full flex justify-between items-center bg-primary text-white py-4 px-8 rounded-tl-lg rounded-tr-lg shadow-sm ">
				<h1 className="text-2xl font-semibold text-white">{surveyTitle}</h1>
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						className="flex items-center gap-2 border border-primary/20 hover:bg-primary/20 text-white rounded-lg p-5 text-md"
					>
						Preview
					</Button>
					<CustomDropdown
						options={modeTypes}
						placeholder="Questionaire Mode"
						selectTriggerClasses="w-[200px] text-white border border-white px-5 dark:border-white focus:border-white dark:focus:border-white focus-visible:border-white h-12 rounded-sm !shadow-none !ring-0"
						defaultValue="Questionnaire mode"
						onValueChange={(value: any) => handleQuestionChange(1, "type", value)}
					/>
				</div>
			</div>

			{/* Questions Section */}
			<div className="flex-1 overflow-auto w-full">
				<Card className="py-6 px-8 rounded-bl-lg wounded-br-lg rounded-tl-none rounded-tr-none shadow-md bg-white w-full">
					<CardContent className="p-0">
						{questions.map((question, index) => (
							<div key={question.id} className="mb-6 last:mb-0">
								<p className=" text-black text-lg mb-2 font-bold">
									{index + 1} of {questions.length} Questions
								</p>
								<div className="border border-gray-400 p-6 xl:p-8 rounded-lg">
									<div className="w-full flex items-center justify-end">
										<CustomDropdown
											options={questionTypes}
											placeholder="Single line text"
											defaultValue={question.type}
											onValueChange={(value: any) =>
												handleQuestionChange(question.id, "type", value)
											}
											selectTriggerClasses="border border-primary/50 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 bg-transparent h-12  !shadow-none !ring-0 w-[160px]"
										/>
									</div>

									<div className="w-full mt-5">
										<Label htmlFor={`question-${question.id}`} className="sr-only">
											Question
										</Label>
										<Input
											type="text"
											id={`question-${question.id}`}
											placeholder="Enter question here"
											value={question.questionText}
											onChange={(e) =>
												handleQuestionChange(
													question.id,
													"questionText",
													e.target.value
												)
											}
											// {...register("surveyName", { required: "Survey Name is required" })}
											className="border border-gray-400 h-12 !shadow-none !ring-0"
										/>
									</div>
									<div className="w-full mt-5">
										<Label htmlFor={`answer-${question.id}`} className="sr-only">
											Answer
										</Label>
										<textarea
											id={`answer-${question.id}`}
											placeholder="Enter answer here"
											value={question.answerText}
											onChange={(e) =>
												handleQuestionChange(
													question.id,
													"answerText",
													e.target.value
												)
											}
											// {...register("surveyName", { required: "Survey Name is required" })}
											className="border border-gray-400 h-12 !shadow-none !ring-0 min-h-[150px] w-full rounded-sm px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										/>
									</div>
								</div>
							</div>
						))}
					</CardContent>
					{/* Bottom Buttons Section */}
					<div className="flex justify-end items-center gap-4 mt-3">
						<Button
							onClick={() => handleDeleteQuestion(questions[questions.length - 1].id)}
							variant="outline"
							className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
						>
							<Trash2 className="h-4 w-4" /> Delete
						</Button>
						<Button
							onClick={handleAddQuestion}
							className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
						>
							<Plus className="h-4 w-4" /> Add question
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default CreateSurveyPage;
