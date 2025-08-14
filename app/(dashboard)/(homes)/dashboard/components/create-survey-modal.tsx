/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use clinet";
import CustomDropdown from "@/app/(dashboard)/components/custom-dropdown";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface CreateSurveyModalProps {
	isOpen: boolean;
	onClose: () => void;
}

type FormValues = {
	surveyName: string;
	numberOfRespondents: number;
	administrationOption: string | any;
	incentiveAmount: number;
};

const CreateSurveyModal: React.FC<CreateSurveyModalProps> = ({ isOpen, onClose }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>();

	const adminOption = watch("administrationOption");

	const handleConductSurvey = (data: FormValues) => {
		console.log(adminOption);
	};

	const handleCloseModal = () => {
		onClose();
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={handleCloseModal}>
				<DialogContent className="sm:max-w-[600px] bg-white z-50 rounded-sm">
					<DialogHeader className="">
						<DialogTitle className="text-center text-2xl font-bold text-black">
							Create Survey
						</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={handleSubmit(handleConductSurvey)}
						className="flex flex-col items-center gap-5 py-2"
					>
						<div className="w-full">
							<Label htmlFor="basicInput" className="text-black dark:text-white mb-2">
								Survey Name
							</Label>
							<Input
								type="text"
								{...register("surveyName", { required: "Survey Name is required" })}
								id="surveyName"
								placeholder="Enter survey name"
								className="border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-lg !shadow-none !ring-0"
							/>
							{errors.surveyName && (
								<p className="text-red-500 text-sm">{errors.surveyName.message}</p>
							)}
						</div>

						<div className="w-full">
							<Label htmlFor="basicInput" className="text-black dark:text-white mb-2">
								Number of Respondents
							</Label>
							<Input
								type="number"
								{...register("numberOfRespondents", {
									required: "Number of respondents is required",
								})}
								id="numberOfRespondents"
								placeholder="Enter here"
								className="border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-lg !shadow-none !ring-0"
							/>
							{errors.numberOfRespondents && (
								<p className="text-red-500 text-sm">{errors.numberOfRespondents.message}</p>
							)}
							{/* <CustomDropdown
								options={numberOfRespondents}
								placeholder="Number of Respondents"
								selectTriggerClasses="border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 bg-transparent h-12 rounded-lg !shadow-none !ring-0"
							/> */}
						</div>

						<div className="w-full space-y-1">
							<Label htmlFor="basicInput" className="text-black dark:text-white mb-3">
								Select Survey Administration Options
							</Label>

							<div className="flex items-center gap-2">
								<Input
									type="radio"
									{...register("administrationOption", {
										required: "Please choose administration option",
									})}
									className="!shadow-none !ring-0 !focus:ring-0 rounded-[50rem] peer w-4 h-4 text-primary bg-primary/50 border-primary/50 focus:primary/50 dark:focus:primary/50 dark:ring-offset-primary/50 focus:ring-2 dark:bg-primary/50 dark:border-primary/50 accent-primary"
									name="administrationOption"
									id="administrationOption1"
									defaultChecked
									value="Administer to Surveyplus Registered Respondents"
								/>
								<label className=" text-sm font-medium" htmlFor="radio1">
									Administer to Surveyplus Registered Respondents
								</label>
							</div>

							<div className="flex items-center gap-2">
								<Input
									type="radio"
									{...register("administrationOption", {
										required: "Please choose administration option",
									})}
									className="!shadow-none !ring-0 !focus:ring-0 rounded-[50rem] peer w-4 h-4 text-primary bg-primary/50 border-primary/50 focus:primary/50 dark:focus:primary/50 dark:ring-offset-primary/50 focus:ring-2 dark:bg-primary/50 dark:border-primary/50 accent-primary"
									name="administrationOption"
									id="administrationOption2"
									value="Will Recruit Respondents and Administer Survey to them"
								/>
								<label className=" text-sm font-medium" htmlFor="radio1">
									Will Recruit Respondents and Administer Survey to them
								</label>
							</div>
						</div>

						{adminOption?.trim().toLocaleLowerCase() ===
							"Will Recruit Respondents and Administer Survey to them"
								.trim()
								.toLocaleLowerCase() && (
							<div className="w-full">
								<Label htmlFor="basicInput" className="text-black dark:text-white mb-2">
									Incentive Amount (In Naira)
								</Label>
								<Input
									type="text"
									{...register("incentiveAmount", {
										required: "Incentive amount is required",
									})}
									id="incentiveAmount"
									placeholder="Enter amount"
									className="border border-primary/50 px-5 dark:border-primary/50 focus:border-primary/50 dark:focus:border-primary/50 focus-visible:border-primary/50 h-12 rounded-lg !shadow-none !ring-0"
								/>
								{errors.incentiveAmount && (
									<p className="text-red-500 text-sm">{errors.incentiveAmount.message}</p>
								)}
							</div>
						)}
						<Button
							type="submit"
							className="mt-6 bg-primary hover:bg-primary/90 text-white cursor-pointer px-8 rounded-sm"
						>
							Conduct Suvery
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CreateSurveyModal;
