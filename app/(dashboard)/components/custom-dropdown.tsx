import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

interface DropdownOption {
	label: string;
	value: string;
}

interface CustomDropdownProps {
	options: DropdownOption[];
	value?: string;
	placeholder?: string;
	selectTriggerClasses?: string;

	//   onChange: (value: string | number) => void;
}

function CustomDropdown({
	options,
	value,
	placeholder = "Select an option",
	selectTriggerClasses, //   onChange,
}: CustomDropdownProps) {
	return (
		<>
			<Select>
				<SelectTrigger className={`w-full rounded-sm bg-foreground/6 ${selectTriggerClasses}`}>
					{/* <SelectValue placeholder="All Surveys" /> */}
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent className="rounded-lg bg-white">
					{options?.map((option) => {
						return <SelectItem value={option.value}>{option.label}</SelectItem>;
					})}
				</SelectContent>
			</Select>
		</>
	);
}

export default CustomDropdown;
