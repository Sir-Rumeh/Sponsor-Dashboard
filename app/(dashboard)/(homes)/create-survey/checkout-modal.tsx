/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use clinet";
import CustomDropdown from "@/app/(dashboard)/components/custom-dropdown";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface CheckoutModalProps {
	isOpen: boolean;
	onClose: () => void;
}

type FormValues = {
	surveyName: string;
	numberOfRespondents: number;
	administrationOption: string | any;
	incentiveAmount: number;
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>();

	const adminOption = watch("administrationOption");

	const handleConductSurvey = (data: FormValues) => {
		console.log(data);
	};

	const handleCloseModal = () => {
		onClose();
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={handleCloseModal}>
				<DialogContent className="sm:max-w-[500px] bg-white z-50 rounded-sm">
					<DialogHeader className="">
						<DialogTitle className="text-center text-2xl font-bold text-black">Checkout</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={handleSubmit(handleConductSurvey)}
						className="flex flex-col items-center gap-5 py-2"
					>
						<div className="w-full"></div>

						<Button
							type="submit"
							className="mt-6 bg-primary hover:bg-primary/90 text-white cursor-pointer px-8 rounded-sm w-full"
						>
							Make Payment
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CheckoutModal;
