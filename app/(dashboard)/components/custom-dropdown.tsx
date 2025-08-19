import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";
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
	defaultValue?: any;
	onValueChange?: any;

	//   onChange: (value: string | number) => void;
}

function CustomDropdown({
	options,
	value,
	placeholder = "Select an option",
	selectTriggerClasses,
	defaultValue,
	onValueChange,
}: CustomDropdownProps) {
	return (
		<>
			<Select defaultValue={defaultValue} onValueChange={onValueChange}>
				<SelectTrigger
					className={`w-full rounded-sm bg-foreground/6 cursor-pointer ${selectTriggerClasses}`}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent className="rounded-md bg-white">
					{options?.map((option) => {
						return (
							<SelectItem className="cursor-pointer" value={option.value}>
								{option.label}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</>
	);
}

export default CustomDropdown;
