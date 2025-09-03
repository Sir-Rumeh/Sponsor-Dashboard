/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use clinet";
import CustomDropdown from "@/app/(dashboard)/components/custom-dropdown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
	editSurveyAgeGroup,
	editSurveyEducation,
	editSurveyGender,
	editSurveyMonthlyIncome,
	editSurveySettlement,
	editSurveyState,
} from "@/config/survey-actions";
import { ageGroupOptions, educationOptions, monthlyIncomeOptions, statesOfNigeria } from "@/utils/constants";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CheckoutModalProps {
	isOpen: boolean;
	onClose: () => void;
	surveyId: number;
}

interface SurveyProperty {
	id: string;
	property: string;
	value: string;
}

type FormValues = {
	// surveyName: string;
	// numberOfRespondents: number;
	// administrationOption: string | any;
	// incentiveAmount: number;
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, surveyId }) => {
	const searchParams = useSearchParams();
	const surveyName = searchParams.get("surveyName");
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>();

	const initialSurveyProperties: SurveyProperty[] = [
		{ id: "1", property: "Gender", value: "All gender" },
		{ id: "2", property: "State", value: "All states" },
		{ id: "3", property: "Settlement", value: "All settlement types" },
		{ id: "4", property: "Monthly Income", value: "All income levels" },
		{ id: "5", property: "Age group", value: "All age groups" },
		{ id: "6", property: "Education", value: "All levels" },
	];

	const [surveyProperties, setSurveyProperties] = useState<SurveyProperty[]>(initialSurveyProperties);
	const [editingProperty, setEditingProperty] = useState<SurveyProperty | null>(null);
	const [editedValue, setEditedValue] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleEditClick = (prop: SurveyProperty) => {
		setEditingProperty(prop);
		setEditedValue(prop.value);
	};

	const handleDialogClose = () => {
		setEditingProperty(null);
	};

	const saveEditedValues = async (prop: SurveyProperty) => {
		setIsLoading(true);
		try {
			switch (prop.property) {
				case "Gender": {
					const res = await editSurveyGender({ id: surveyId, gender: editedValue });
					if (res) {
						return toast.success(res.message);
					}
				}
				case "State": {
					const res = await editSurveyState({ id: surveyId, state: editedValue });
					if (res) {
						return toast.success(res.message);
					}
				}
				case "Settlement": {
					const res = await editSurveySettlement({ id: surveyId, settlement: editedValue });
					if (res) {
						return toast.success(res.message);
					}
				}
				case "Monthly Income": {
					const res = await editSurveyMonthlyIncome({ id: surveyId, montly_income: editedValue });
					if (res) {
						return toast.success(res.message);
					}
				}
				case "Age group": {
					const res = await editSurveyAgeGroup({ id: surveyId, age_group: editedValue });
					if (res) {
						return toast.success(res.message);
					}
				}
				case "Education": {
					const res = await editSurveyEducation({ id: surveyId, education: editedValue });
					if (res) {
						return toast.success(res.message);
					}
				}
			}
		} catch (error) {
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = async () => {
		if (!editingProperty) return;
		saveEditedValues(editingProperty);
		const updatedProperties = surveyProperties.map((prop) =>
			prop.id === editingProperty.id ? { ...prop, value: editedValue } : prop
		);
		setSurveyProperties(updatedProperties);
		handleDialogClose();
	};

	const handleCheckboxChange = (value: string, isChecked: boolean) => {
		const currentArray = editedValue.split(",").filter((item) => item !== "");
		if (isChecked) {
			if (!currentArray.includes(value)) {
				setEditedValue([...currentArray, value].join(","));
			}
		} else {
			setEditedValue(currentArray.filter((item) => item !== value).join(","));
		}
	};

	// Helper function to render the correct dialog content based on property type
	const renderEditContent = (property: string) => {
		const currentValueArray = editedValue.split(",").filter((item) => item !== "");

		switch (property) {
			case "Gender":
				return (
					<RadioGroup onValueChange={setEditedValue} value={editedValue}>
						<div className="flex items-center space-x-2 ">
							<RadioGroupItem value="All gender" id="all-genders" className="cursor-pointer" />
							<Label htmlFor="all-genders" className="cursor-pointer">
								All genders
							</Label>
						</div>
						<div className="flex items-center space-x-2 ">
							<RadioGroupItem value="Male" id="male" className="cursor-pointer" />
							<Label htmlFor="male" className="cursor-pointer">
								Male
							</Label>
						</div>
						<div className="flex items-center space-x-2 ">
							<RadioGroupItem value="Female" id="female" className="cursor-pointer" />
							<Label htmlFor="female" className="cursor-pointer">
								Female
							</Label>
						</div>
					</RadioGroup>
				);
			case "State":
				return (
					<div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="all-states"
								checked={
									currentValueArray.includes("All states") ||
									(statesOfNigeria.length > 0 &&
										currentValueArray.length === statesOfNigeria.length)
								}
								onCheckedChange={(isChecked: boolean) => {
									if (isChecked) {
										setEditedValue(statesOfNigeria.join(","));
									} else {
										setEditedValue("");
									}
								}}
							/>
							<Label htmlFor="all-states">All states</Label>
						</div>
						{statesOfNigeria.map((state) => (
							<div key={state} className="flex items-center space-x-2">
								<Checkbox
									id={state}
									checked={currentValueArray.includes(state)}
									onCheckedChange={(isChecked: boolean) =>
										handleCheckboxChange(state, isChecked)
									}
								/>
								<Label htmlFor={state}>{state}</Label>
							</div>
						))}
					</div>
				);
			case "Settlement":
				return (
					<RadioGroup onValueChange={setEditedValue} value={editedValue}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="All settlement types" id="all-settlements" />
							<Label className="cursor-pointer" htmlFor="all-settlements">
								All settlement types
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Urban" id="urban" />
							<Label className="cursor-pointer" htmlFor="urban">
								Urban
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Rural" id="rural" />
							<Label className="cursor-pointer" htmlFor="rural">
								Rural
							</Label>
						</div>
					</RadioGroup>
				);
			case "Monthly Income":
				return (
					<div className="flex flex-col gap-2">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="all-income-levels"
								checked={
									currentValueArray.includes("All income levels") ||
									(monthlyIncomeOptions.length > 0 &&
										currentValueArray.length === monthlyIncomeOptions.length)
								}
								onCheckedChange={(isChecked: boolean) => {
									if (isChecked) {
										setEditedValue(monthlyIncomeOptions.join(","));
									} else {
										setEditedValue("");
									}
								}}
							/>
							<Label htmlFor="all-income-levels">All income levels</Label>
						</div>
						{monthlyIncomeOptions.map((option) => (
							<div key={option} className="flex items-center space-x-2">
								<Checkbox
									id={option}
									checked={currentValueArray.includes(option)}
									onCheckedChange={(isChecked: boolean) =>
										handleCheckboxChange(option, isChecked)
									}
								/>
								<Label htmlFor={option}>{option}</Label>
							</div>
						))}
					</div>
				);
			case "Age group":
				return (
					<div className="flex flex-col gap-2">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="all-age-group"
								checked={
									currentValueArray.includes("All age groups") ||
									(ageGroupOptions.length > 0 &&
										currentValueArray.length === ageGroupOptions.length)
								}
								onCheckedChange={(isChecked: boolean) => {
									if (isChecked) {
										setEditedValue(ageGroupOptions.join(","));
									} else {
										setEditedValue("");
									}
								}}
							/>
							<Label htmlFor="all-age-group">All age groups</Label>
						</div>
						{ageGroupOptions.map((option) => (
							<div key={option} className="flex items-center space-x-2">
								<Checkbox
									id={option}
									checked={currentValueArray.includes(option)}
									onCheckedChange={(isChecked: boolean) =>
										handleCheckboxChange(option, isChecked)
									}
								/>
								<Label htmlFor={option}>{option}</Label>
							</div>
						))}
					</div>
				);
			case "Education":
				return (
					<div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="all-levels"
								checked={
									currentValueArray.includes("All levels") ||
									(educationOptions.length > 0 &&
										currentValueArray.length === educationOptions.length)
								}
								onCheckedChange={(isChecked: boolean) => {
									if (isChecked) {
										setEditedValue(educationOptions.join(","));
									} else {
										setEditedValue("");
									}
								}}
							/>
							<Label htmlFor="all-levels">All levels</Label>
						</div>
						{educationOptions.map((option) => (
							<div key={option} className="flex items-center space-x-2">
								<Checkbox
									id={option}
									checked={currentValueArray.includes(option)}
									onCheckedChange={(isChecked: boolean) =>
										handleCheckboxChange(option, isChecked)
									}
								/>
								<Label htmlFor={option}>{option}</Label>
							</div>
						))}
					</div>
				);
			default:
				return <p>Editing not available for this property.</p>;
		}
	};

	// const adminOption = watch("administrationOption");

	const handleMakePayment = (data: FormValues) => {
		console.log(data);
	};

	const handleCloseModal = () => {
		onClose();
	};

	const balance = 5000;
	const estimatedBill = 2500;

	return (
		<>
			<Dialog open={isOpen} onOpenChange={handleCloseModal}>
				<DialogContent className="sm:max-w-[550px] bg-white z-50 rounded-sm px-8">
					<DialogHeader className="">
						<DialogTitle className="text-center text-2xl font-bold text-black">
							<p className="text-3xl font-bold text-center text-gray-800">Checkout</p>
						</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={handleSubmit(handleMakePayment)}
						className="flex flex-col items-center gap-5 py-2"
					>
						<div className="w-full flex flex-col gap-1 space-y-2">
							<h2 className="text-lg font-semibold text-gray-900">Survey Details</h2>
							<div className="flex items-center space-x-2">
								<p className=" text-gray-700 font-semibold">Survey name:</p>
								<span className="text-gray-600">{surveyName}</span>
							</div>
							<div className="flex items-center space-x-2">
								<p className=" text-gray-700 font-semibold">Question limit:</p>
								<span className="text-gray-600">5</span>
							</div>
						</div>

						<div className="rounded-lg overflow-hidden w-full">
							<Table className="table-auto border-collapse border-0 w-full ">
								<TableHeader className="bg-gray-100">
									<TableRow className="border-0 h-14 px-1">
										<TableHead className="w-1/2 font-semibold text-gray-700">
											Survey property
										</TableHead>
										<TableHead className="w-1/2 font-semibold text-gray-700">
											Value
										</TableHead>
										<TableHead className="w-1/5 font-semibold text-gray-700 text-right">
											Action
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody className="border">
									{surveyProperties.map((prop) => (
										<TableRow className="h-14 px-2" key={prop.id}>
											<TableCell className="font-medium text-gray-800 border-0">
												{prop.property}
											</TableCell>
											<TableCell className="text-gray-600 border-0 whitespace-normal break-words">
												{prop.property === "State" &&
												prop.value === statesOfNigeria.join(",")
													? "All states"
													: prop.property === "Monthly Income" &&
													  prop.value === monthlyIncomeOptions.join(",")
													? "All income levels"
													: prop.property === "Age Group" &&
													  prop.value === ageGroupOptions.join(",")
													? "All age groups"
													: prop.property === "Education" &&
													  prop.value === educationOptions.join(",")
													? "All education levels"
													: prop.value}
											</TableCell>
											<TableCell className="text-right border-0">
												<Button
													onClick={() => handleEditClick(prop)}
													type="button"
													variant="link"
													className="text-primary hover:text-primary/95 p-0 h-auto cursor-pointer"
												>
													Edit
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							<div className="w-full mt-4 flex items-center justify-end">
								<p className="text-xl font-bold">Estimated Bill: N{2500}</p>
							</div>

							{balance < estimatedBill && (
								<div className="w-full mt-4 flex items-center justify-center">
									<p className="text-xl font-bold text-center text-red-400">
										Insufficient Fund
									</p>
								</div>
							)}
						</div>
						<div className="w-full mt-2">
							{balance < estimatedBill ? (
								<Button
									type="button"
									className="bg-primary hover:bg-primary/90 text-white cursor-pointer px-8 py-5 rounded-sm w-full"
								>
									Add money to wallet
								</Button>
							) : (
								<Button
									type="submit"
									className="bg-primary hover:bg-primary/90 text-white cursor-pointer px-8 py-5 rounded-sm w-full"
								>
									Make Payment
								</Button>
							)}
						</div>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={!!editingProperty} onOpenChange={handleDialogClose}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit {editingProperty?.property}</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 py-4">
						{editingProperty && renderEditContent(editingProperty.property)}
					</div>
					<DialogFooter>
						<Button
							onClick={handleSave}
							className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
						>
							{isLoading ? (
								<>
									<Loader2 className="animate-spin h-4.5 w-4.5 mr-2" />
									Saving...
								</>
							) : (
								<>Save</>
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CheckoutModal;
