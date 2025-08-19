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
							<Label htmlFor="all-settlements">All settlement types</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Urban" id="urban" />
							<Label htmlFor="urban">Urban</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Rural" id="rural" />
							<Label htmlFor="rural">Rural</Label>
						</div>
					</RadioGroup>
				);
			case "Monthly Income":
			case "Age group":
			case "Education":
				// Placeholder for other properties, which might use different input types
				return <p>Editing not yet implemented for this property.</p>;
			default:
				return null;
		}
	};

	// const adminOption = watch("administrationOption");

	const handleMakePayment = (data: FormValues) => {
		console.log(data);
	};

	const handleCloseModal = () => {
		onClose();
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={handleCloseModal}>
				<DialogContent className="sm:max-w-[550px] bg-white z-50 rounded-sm px-10">
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

						<div className="rounded-lg border overflow-hidden w-full">
							<Table className="table-auto border-collapse border-0 w-full">
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
								<TableBody className="border-none">
									{surveyProperties.map((prop) => (
										<TableRow className="h-14 px-2 border-b" key={prop.id}>
											<TableCell className="font-medium text-gray-800 border-0">
												{prop.property}
											</TableCell>
											<TableCell className="text-gray-600 border-0">
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
						</div>

						<Button
							type="submit"
							className="mt-6 bg-primary hover:bg-primary/90 text-white cursor-pointer px-8 rounded-sm w-full"
						>
							Make Payment
						</Button>
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
