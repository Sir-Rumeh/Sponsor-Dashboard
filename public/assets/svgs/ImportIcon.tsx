import React from "react";

interface ImportIconProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
}

export default function ImportIcon({ ...props }: ImportIconProps) {
	return (
		<svg
			width="20"
			height="14"
			viewBox="0 0 20 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			// className={`group-hover:fill-white`}
		>
			<rect width="20" height="14" fill="url(#pattern0_447_819)" />
			<defs>
				<pattern id="pattern0_447_819" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_447_819" transform="matrix(0.00729167 0 0 0.0104167 0.15 0)" />
				</pattern>
				<image
					id="image0_447_819"
					width="96"
					height="96"
					preserveAspectRatio="none"
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2dzW0VMRSFzwqKAfqggWCLRtjSAChBEB8ogRqAJhIK4Wf5UNBlhQQP3psZ+8y1zifdbeR83/gmOwPGGGOMMcYY05m3ePqooVw1lNuG8p2od8qJM8RZiHp5jScPp/0ArvD4fkO9JsoPtXQenThbefMeF/cwofxPesH11BAfp4rQUJpeaj13Nb3GLDt/32unHglQD+9QHyA78QdXLZOLp7xEdoj6WS+yLp0bZIeo33Yg8m7JNNSvyI5aIlcOsqMWSAfQS6RvgF4kvYJyDrKjFkgH0Eukb4BeJL2Ccg6yoxZIB9BLpG+AXiS9gnIOsqMWSAfQS6RvgF4kvYK2klKeOYDwbwB+/cxxEZCdXkI4KAKy01MIB0RAdnoLYecIyM4IIewYAdkZJYSdIiA7I4WwQwRkZ7QQbhwB2VF8kdwwArKjWgncKAKyowqwVQSoyf4LcGUE9fnTB1gbAWpmCLAmAtTMEmBpBKiZKUBDeZ7u/LMEaAvk7+L8MwRoC+Xv4vzZA7QV8vdwfnlArhCyVr4DYLmQLeQ7AJYJ2Uq+A+B8IVvKdwCcJ2Rr+Q6A04X0kO8AOE1IL/kOgP8L6SnfAfBvIb3lOwCOCxkh3wHwdyGj5DsA/hQyUr4DYJxoB4Betm8A9MK9grCvQXbUAukAeon0DdCLpFdQzkF21ALpAHqJ9A3Qi6RXUM5BdtQC6QB6ifQN0IukV1DOQXYyP+BAlC/Ijp8wERMv1Om/5LpoGuoLZCeeB4wnoRLKP0zxjFUQzwPmC1BeYRbiWcB4HjDR1/9hqqcMg/iF4nnAPa+jhnqIL386+b8TezVeqItH0riPf1HjDDdxpml2vjHGGGOMMQZ75ifOa44Sh2IHgwAAAABJRU5ErkJggg=="
				/>
			</defs>
		</svg>
	);
}
