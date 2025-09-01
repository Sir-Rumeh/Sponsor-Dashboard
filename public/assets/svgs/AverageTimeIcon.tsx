import React from "react";

interface ImportIconProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
}

interface AverageTimeIconProps extends React.ComponentPropsWithoutRef<"svg"> {
	className?: string;
}

const AverageTimeIcon = React.forwardRef<SVGSVGElement, AverageTimeIconProps>(({ className, ...props }, ref) => {
	return (
		<svg
			ref={ref}
			width="26"
			height="26"
			viewBox="0 0 26 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...props}
		>
			<path
				d="M12.987 0C5.811 0 0 5.824 0 13C0 20.176 5.811 26 12.987 26C20.176 26 26 20.176 26 13C26 5.824 20.176 0 12.987 0ZM17.277 19.123L11.7 13.533V6.5H14.3V12.467L19.123 17.29L17.277 19.123Z"
				fill="currentColor"
			/>
		</svg>
	);
});

export default AverageTimeIcon;

// AverageTimeIcon({ ...props }: ImportIconProps) {
// 	return (
// 		<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
// 			<path
// 				d="M12.987 0C5.811 0 0 5.824 0 13C0 20.176 5.811 26 12.987 26C20.176 26 26 20.176 26 13C26 5.824 20.176 0 12.987 0ZM17.277 19.123L11.7 13.533V6.5H14.3V12.467L19.123 17.29L17.277 19.123Z"
// 				fill="#434343"
// 			/>
// 		</svg>
// 	);
// }
