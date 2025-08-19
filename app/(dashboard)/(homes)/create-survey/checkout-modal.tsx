/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use clinet";
import CustomDropdown from "@/app/(dashboard)/components/custom-dropdown";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CheckoutModalProps {
	isOpen: boolean;
	onClose: () => void;
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

const statesOfNigeria = [
	"Abia",
	"Adamawa",
	"Akwa Ibom",
	"Anambra",
	"Bauchi",
	"Bayelsa",
	"Benue",
	"Borno",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"FCT - Abuja",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kano",
	"Katsina",
	"Kebbi",
	"Kogi",
	"Kwara",
	"Lagos",
	"Nasarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yobe",
	"Zamfara",
];

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
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

	const handleEditClick = (prop: SurveyProperty) => {
		setEditingProperty(prop);
		setEditedValue(prop.value);
	};

	const handleDialogClose = () => {
		setEditingProperty(null);
	};

	const handleSave = () => {
		if (!editingProperty) return;

		const updatedProperties = surveyProperties.map((prop) =>
			prop.id === editingProperty.id ? { ...prop, value: editedValue } : prop
		);
		setSurveyProperties(updatedProperties);
		handleDialogClose();
	};

	// Helper function to render the correct dialog content based on property type
	const renderEditContent = (property: string) => {
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
					// This is a placeholder for a more complex component, e.g., a multi-select dropdown
					<Select onValueChange={setEditedValue} value={editedValue}>
						<SelectTrigger className="w-full cursor-pointer">
							<SelectValue placeholder="Select a state" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem className="cursor-pointer" value="All states">
								All states
							</SelectItem>
							{statesOfNigeria.map((state) => (
								<SelectItem className="cursor-pointer" key={state} value={state}>
									{state}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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
					<RadioGroup onValueChange={setEditedValue} value={editedValue}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								className="cursor-pointer"
								value="All income levels"
								id="all-income"
							/>
							<Label className="cursor-pointer" htmlFor="all-income">
								All Income level
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								className="cursor-pointer"
								value="Not currently working, someone else pays my bills"
								id="not-working"
							/>
							<Label className="cursor-pointer" htmlFor="not-working">
								Not currently working, someone else pays my bills
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								className="cursor-pointer"
								value="Earn less than N30,000 monthly"
								id="less-than-30k"
							/>
							<Label className="cursor-pointer" htmlFor="less-than-30k">
								Earn less than N30,000 monthly
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								className="cursor-pointer"
								value="Earn between N30,001 and N100,000 monthly"
								id="30k-to-100k"
							/>
							<Label className="cursor-pointer" htmlFor="30k-to-100k">
								Earn between N30,001 and N100,000 monthly
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								className="cursor-pointer"
								value="Earn above N100,000 monthly"
								id="above-100k"
							/>
							<Label className="cursor-pointer" htmlFor="above-100k">
								Earn above N100,000 monthly
							</Label>
						</div>
					</RadioGroup>
				);
			case "Age group":
				return (
					<RadioGroup onValueChange={setEditedValue} value={editedValue}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="All age groups" id="all-age-groups" />
							<Label className="cursor-pointer" htmlFor="all-age-groups">
								All age groups
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="18 - 24 years" id="18-24" />
							<Label className="cursor-pointer" htmlFor="18-24">
								18 - 24 years
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="25 - 34 years" id="25-34" />
							<Label className="cursor-pointer" htmlFor="25-34">
								25 - 34 years
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="35 - 44 years" id="35-44" />
							<Label className="cursor-pointer" htmlFor="35-44">
								35 - 44 years
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="45 - 54 years" id="45-54" />
							<Label className="cursor-pointer" htmlFor="45-54">
								45 - 54 years
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="55 - 64 years" id="55-64" />
							<Label className="cursor-pointer" htmlFor="55-64">
								55 - 64 years
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Above 65 years" id="above-65" />
							<Label className="cursor-pointer" htmlFor="above-65">
								Above 65 years
							</Label>
						</div>
					</RadioGroup>
				);
			case "Education":
				return (
					<RadioGroup onValueChange={setEditedValue} value={editedValue}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="All levels" id="all-levels" />
							<Label className="cursor-pointer" htmlFor="all-levels">
								All levels
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Pre-school" id="pre-school" />
							<Label className="cursor-pointer" htmlFor="pre-school">
								Pre-school
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Primary incomplete" id="primary-incomplete" />
							<Label className="cursor-pointer" htmlFor="primary-incomplete">
								Primary incomplete
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Primary complete" id="primary-complete" />
							<Label className="cursor-pointer" htmlFor="primary-complete">
								Primary complete
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Secondary incomplete" id="secondary-incomplete" />
							<Label className="cursor-pointer" htmlFor="secondary-incomplete">
								Secondary incomplete
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Secondary complete" id="secondary-complete" />
							<Label className="cursor-pointer" htmlFor="secondary-complete">
								Secondary complete
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="University/Polytechnic Undergraduate" id="uni-undergrad" />
							<Label className="cursor-pointer" htmlFor="uni-undergrad">
								University/Polytechnic Undergraduate
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="University/Polytechnic OND complete" id="uni-ond" />
							<Label className="cursor-pointer" htmlFor="uni-ond">
								University/Polytechnic OND complete
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="University/Polytechnic HND complete" id="uni-hnd" />
							<Label className="cursor-pointer" htmlFor="uni-hnd">
								University/Polytechnic HND complete
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Post-university incomplete" id="post-uni-incomplete" />
							<Label className="cursor-pointer" htmlFor="post-uni-incomplete">
								Post-university incomplete
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Post-university complete" id="post-uni-complete" />
							<Label className="cursor-pointer" htmlFor="post-uni-complete">
								Post-university complete
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="Non-formal education (e.g. Arabic/Quranic education)"
								id="non-formal"
							/>
							<Label className="cursor-pointer" htmlFor="non-formal">
								Non-formal education (e.g. Arabic/Quranic education)
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="No education" id="no-education" />
							<Label className="cursor-pointer" htmlFor="no-education">
								No education
							</Label>
						</div>
					</RadioGroup>
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
							<h2 className="text-lg font-semibold text-gray-700">Survey Details</h2>
							<div className="flex items-center space-x-2">
								<p className="text-gray-900 font-semibold">Survey name:</p>
								<span className="text-gray-600">{surveyName}</span>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-900 font-semibold">Question limit:</p>
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
								<TableBody className="border ">
									{surveyProperties.map((prop) => (
										<TableRow className="h-14 px-2" key={prop.id}>
											<TableCell className="font-medium text-gray-800 border-0">
												{prop.property}
											</TableCell>
											<TableCell className="text-gray-600 border-0 whitespace-normal break-words">
												{prop.value}
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
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CheckoutModal;
