/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
	ChevronLeft,
	Plus,
	Save,
	SquareArrowUpRight,
	Trash2,
	CheckCircle,
	XCircle,
	ChevronDownIcon,
	Loader2,
} from "lucide-react";
import ArrowBackIcon from "@/public/assets/svgs/ArrowBackIcon";
import { useRouter, useSearchParams } from "next/navigation";
import DraftIcon from "@/public/assets/svgs/DraftIcon";
import ImportIcon from "@/public/assets/svgs/ImportIcon";
import CheckoutIcon from "@/public/assets/svgs/CheckoutIcon";
import CustomDropdown from "../../components/custom-dropdown";
import * as SelectPrimitive from "@radix-ui/react-select";
import CheckoutModal from "./checkout-modal";
import toast from "react-hot-toast";
import { addQuestionToSurvey, viewSurveyDetails } from "@/config/survey-actions";

// export const metadata: Metadata = {
// 	title: "Create Survey - SurveyPlus",
// 	description: "Create and design a new survey for your respondents.",
// };

interface Question {
	id: number;
	questionText: string;
	answerText: string;
	type: "Single line text" | "Radio mode" | "Checkbox" | "Dropdown";
	options?: string[];
}

const CreateSurveyPage = () => {
	const [isCheckoutModal, setIsCheckoutModal] = useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const from = searchParams.get("from");
	const id = searchParams.get("surveyId");
	const surveyId = parseInt(id || "");
	const [surveyTitle, setSurveyTitle] = useState();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [surveyDetails, setSurveyDetails] = useState<any>();
	const [category, setCategory] = useState<string>("");
	const [addToSurveyloadingStates, setAddToSurveyloadingStates] = useState<{ [key: number]: boolean }>({});
	const [addedQuestionIds, setAddedQuestionIds] = useState<number[]>([]);
	const [questions, setQuestions] = useState<Question[]>([
		{
			id: 1,
			questionText: "",
			answerText: "",
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
				options: [],
			},
		]);
	};

	const handleDeleteQuestion = (id: number) => {
		setQuestions(questions.filter((question) => question.id !== id));
	};

	const handleQuestionChange = (id: number, field: keyof Question, value: any) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === id) {
					if (field === "type") {
						// Reset options when switching question types
						if (value === "Radio mode" || value === "Checkbox" || value === "Dropdown") {
							return {
								...question,
								[field]: value,
								options: ["Option 1", "Option 2", "Option 3", "Option 4"],
							};
						} else {
							return { ...question, [field]: value, options: undefined };
						}
					}
					return { ...question, [field]: value };
				}
				return question;
			})
		);
	};

	const handleAddOption = (questionId: number) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId && question.options) {
					const newOption = `Option ${question.options.length + 1}`;
					return {
						...question,
						options: [...question.options, newOption],
					};
				}
				return question;
			})
		);
	};

	const handleDeleteOption = (questionId: number, optionIndex: number) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId && question.options) {
					return {
						...question,
						options: question.options.filter((_, index) => index !== optionIndex),
					};
				}
				return question;
			})
		);
	};

	const handleValidateQuestions = (questions: Question[]): boolean => {
		let isValid = true;
		// const questionsToValidate = questions.slice(0, -1);
		for (const q of questions) {
			if (!q.questionText.trim()) {
				toast.error(
					<span>
						Question <strong>#{q.id}</strong> is missing a question text
					</span>
				);
				isValid = false;
			}
			if (!q.answerText.trim()) {
				toast.error(
					<span>
						Question <strong>#{q.id}</strong> is missing an answer text
					</span>
				);
				isValid = false;
			}
		}
		return isValid;
	};
	const handleValidateQuestion = (questions: Question[], id: number): boolean => {
		let isValid = true;
		const q = questions.find((question) => question.id === id);

		if (!q) {
			toast.error(`Question with id ${id} not found`);
			return false;
		}

		if (!q.questionText.trim()) {
			toast.error(
				<span>
					Question <strong>#{q.id}</strong> is missing a question text
				</span>
			);
			isValid = false;
		}

		if (!q.answerText.trim()) {
			toast.error(
				<span>
					Question <strong>#{q.id}</strong> is missing an answer text
				</span>
			);
			isValid = false;
		}

		return isValid;
	};

	const handleAddQuestionToSurvey = async (question: Question) => {
		const questionsValid = handleValidateQuestion(questions, question.id);
		if (!questionsValid) return;
		const payload = {
			question: question.questionText,
			category,
			question_type: question.type.toLowerCase().replace(/\s+/g, "_"),
			options: question?.options?.join(",") || "",
			survey_id: surveyId || 0,
			screening_type: "",
		};
		setAddToSurveyloadingStates((prev) => ({ ...prev, [question.id]: true }));
		try {
			const res = await addQuestionToSurvey(payload);
			if (res) {
				setAddToSurveyloadingStates((prev) => ({ ...prev, [question.id]: false }));
				setAddedQuestionIds((prev) => [...prev, question.id]);
				toast.success("Question added successfully");
				console.log(res.data.id);
				// Do something with the res question id
			}
		} catch (error) {
			setAddToSurveyloadingStates((prev) => ({ ...prev, [question.id]: false }));
		} finally {
			setAddToSurveyloadingStates((prev) => ({ ...prev, [question.id]: false }));
		}
	};

	useEffect(() => {
		const fetchSurveyDetails = async () => {
			try {
				const res = surveyId && (await viewSurveyDetails(surveyId));
				setSurveyTitle(res.data.survey_name);
				setSurveyDetails(res.data);
			} catch (err) {
				console.error("Error fetching surveys:", err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchSurveyDetails();
	}, [surveyId]);

	const modeTypes = [
		{ value: "Questionaire mode", label: "Questionaire Mode" },
		{ value: "Screening mode", label: "Screening Mode" },
	];

	const questionTypes = [
		{ value: "Single line text", label: "Single line text" },
		{ value: "Radio mode", label: "Radio mode" },
		{ value: "Checkbox", label: "Checkbox" },
		{ value: "Dropdown", label: "Dropdown" },
	];

	return (
		<>
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
							className="flex items-center gap-2 bg-transparent border border-primary hover:bg-primary  text-primary rounded-lg p-5 text-md"
						>
							<DraftIcon /> Save to draft
						</Button>
						<Button
							variant="outline"
							className="flex items-center gap-2 bg-transparent border border-primary hover:bg-primary  text-primary rounded-lg p-5 text-md"
						>
							<ImportIcon className="scale-150 " /> Import template
						</Button>
						<Button
							onClick={() => {
								const questionsValid = handleValidateQuestions(questions);
								if (!questionsValid) return;
								setIsCheckoutModal(true);
							}}
							className="flex items-center p-5 gap-2 bg-primary hover:bg-primary/90 text-white text-md"
						>
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
						<Select onValueChange={setCategory} value={category}>
							<SelectTrigger className="cursor-pointer w-[200px] text-white border border-white px-5 dark:border-white focus:border-white dark:focus:border-white focus-visible:border-white h-12 rounded-sm !shadow-none !ring-0">
								<SelectValue placeholder="Questionaire Mode" />
							</SelectTrigger>
							<SelectContent>
								{modeTypes.map((mode) => (
									<SelectItem className="cursor-pointer" key={mode.label} value={mode.value}>
										{mode.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Questions Section */}
				<div className="flex-1 overflow-auto w-full">
					<Card className="py-6 px-8 rounded-bl-lg wounded-br-lg rounded-tl-none rounded-tr-none shadow-md bg-white w-full">
						<CardContent className="p-0">
							{questions.map((question, index) => (
								<div
									key={question.id}
									className={`mb-6 last:mb-0 ${questions.length - 1 === index && ""}`}
								>
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
										{/* Survey Answer Section */}
										<div className="w-full mt-5">
											<Label htmlFor={`answer-${question.id}`} className="sr-only">
												Answer
											</Label>
											{question.type === "Single line text" && (
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
											)}
											{(question.type === "Radio mode" ||
												question.type === "Checkbox" ||
												question.type === "Dropdown") && (
												<>
													<div className="space-y-4">
														{question.options?.map((option, optionIndex) => (
															<div
																key={optionIndex}
																className="flex items-center gap-2 relative focus:border-primary border-b"
															>
																{question.type === "Radio mode" && (
																	<input
																		type="radio"
																		name={`radio-${question.id}`}
																		className="h-4 w-4 text-primary focus:ring-primary border-gray-300 accent-primary cursor-pointer"
																	/>
																)}
																{question.type === "Checkbox" && (
																	<input
																		type="checkbox"
																		className="h-4 w-4 text-primary focus:ring-primary rounded border-gray-300 accent-primary cursor-pointer"
																	/>
																)}
																{question.type === "Dropdown" && (
																	<SelectPrimitive.Icon asChild>
																		<ChevronDownIcon className="size-4 text-primary" />
																	</SelectPrimitive.Icon>
																)}
																<Input
																	value={option}
																	onChange={(e) => {
																		const newOptions = [
																			...(question.options ||
																				[]),
																		];
																		newOptions[optionIndex] =
																			e.target.value;
																		handleQuestionChange(
																			question.id,
																			"options",
																			newOptions
																		);
																	}}
																	className="flex-1 border-gray-300 border-0 border-t-0 border-l-0 border-r-0 rounded-none focus:ring-0 disabled:opacity-100"
																/>
																{(question.options?.length ?? 0) >
																	1 && (
																	<Button
																		variant="ghost"
																		onClick={() =>
																			handleDeleteOption(
																				question.id,
																				optionIndex
																			)
																		}
																		className="h-2 w-2 py-3 text-red-500 hover:bg-red-100 absolute right-0 "
																	>
																		<Trash2 className="h-4 w-4" />
																	</Button>
																)}
															</div>
														))}
														<Button
															variant="outline"
															onClick={() => handleAddOption(question.id)}
															className="w-auto flex items-center gap-2 bg-primary/5 border-0 hover:text-prim text-primary hover:bg-primary/10"
														>
															<Plus className="h-5 w-5 bg-primary/8 rounded-8" />{" "}
															Add options
														</Button>
													</div>
												</>
											)}
											<div className="flex justify-end items-center gap-4 mt-3">
												{questions.length > 1 && (
													<Button
														onClick={() =>
															handleDeleteQuestion(
																questions[questions.length - 1].id
															)
														}
														variant="outline"
														className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:border-none"
													>
														<Trash2 className="h-4 w-4" /> Delete
													</Button>
												)}
												<Button
													onClick={() => handleAddQuestionToSurvey(question)}
													className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
													disabled={addedQuestionIds.includes(question.id)}
												>
													{addedQuestionIds.includes(question.id) ? (
														"Added to survey"
													) : addToSurveyloadingStates[question.id] ? (
														<>
															<Loader2 className="animate-spin h-4.5 w-4.5 mr-2" />
															Adding...
														</>
													) : (
														<>
															<Plus className="h-4 w-4" />
															Add to survey
														</>
													)}
												</Button>
											</div>
										</div>
									</div>
								</div>
							))}
						</CardContent>
						{/* Bottom Buttons Section */}

						<div className="flex justify-end items-center gap-4 mt-3">
							<Button
								onClick={handleAddQuestion}
								className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
							>
								<Plus className="h-4 w-4" /> Add New question
							</Button>
						</div>
					</Card>
				</div>
			</div>
			<CheckoutModal isOpen={isCheckoutModal} onClose={() => setIsCheckoutModal(false)} surveyId={surveyId} />
		</>
	);
};

export default CreateSurveyPage;
