"use client";

import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import DefaultUploadedImage from "@/public/assets/images/user-grid/user-grid-bg1.png";
import { StaticImageData } from "next/image";

const AvatarUpload = () => {
	const [imagePreview, setImagePreview] = useState<string | StaticImageData>(DefaultUploadedImage);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="avatar-upload">
			<div className="avatar-edit absolute top-[8rem] end-[5rem] z-[1] cursor-pointer">
				<Input
					type="file"
					id="imageUpload"
					accept=".png, .jpg, .jpeg"
					ref={fileInputRef}
					onChange={handleImageChange}
					hidden
				/>
				<Label
					htmlFor="imageUpload"
					className="w-8 h-8 flex justify-center items-center bg-primary/20 dark:bg-primary/70 text-primary/90 dark:text-prmary/90 border border-primary/90 hover:bg-primary/20 text-lg rounded-full cursor-pointer"
				>
					<Camera className="w-4 h-4 text-primary/80" />
				</Label>
			</div>

			<img
				src="assets/images/user-grid/user-grid-img14.png"
				alt=""
				className="border br-white border-width-2-px w-200-px h-[200px] rounded-full object-fit-cover mx-auto"
			/>
		</div>
	);
};

export default AvatarUpload;
