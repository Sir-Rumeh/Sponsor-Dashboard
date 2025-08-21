import React from "react";

interface ImportIconProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
}

export default function LinkSentIcon({ ...props }: ImportIconProps) {
	return (
		<svg width="48" height="43" viewBox="0 0 48 43" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M43.2 0H4.8C2.16 0 0 2.15 0 4.77778V38.2222C0 40.85 2.16 43 4.8 43H43.2C45.84 43 48 40.85 48 38.2222V4.77778C48 2.15 45.84 0 43.2 0ZM19.2 33.4444H7.2V28.6667H19.2V33.4444ZM19.2 23.8889H7.2V19.1111H19.2V23.8889ZM19.2 14.3333H7.2V9.55556H19.2V14.3333ZM30.768 28.6667L24 21.8822L27.384 18.5139L30.768 21.9061L38.376 14.3333L41.784 17.7256L30.768 28.6667Z"
				fill="#980058"
			/>
		</svg>
	);
}
