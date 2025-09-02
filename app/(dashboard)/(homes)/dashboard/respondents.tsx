import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image, { StaticImageData } from "next/image";
import PerformerImg1 from "@/public/assets/images/users/user1.png";
import PerformerImg2 from "@/public/assets/images/users/user2.png";
import PerformerImg3 from "@/public/assets/images/users/user3.png";
import PerformerImg4 from "@/public/assets/images/users/user4.png";
import PerformerImg5 from "@/public/assets/images/users/user5.png";
import PerformerImg6 from "@/public/assets/images/users/user1.png";
import CommonLink from "@/components/shared/common-link";

export interface Respondents {
	id: number;
	name: string;
	image: StaticImageData;
	agentId: string;
	earnings: number;
}

const RespondentsCard = ({ respondents }: { respondents: any[] }) => {
	return (
		<Card className="card">
			<CardContent className="card-body p-0 ">
				<div className="flex items-center justify-between">
					<h6 className="mb-3 font-semibold text-lg">Respondents</h6>
				</div>

				<div className="mt-2 space-y-6">
					{respondents.length > 0 ? (
						respondents?.map((respondent, index) => {
							return (
								<div className="flex items-center justify-between gap-2" key={index}>
									<div className="flex items-center gap-3">
										<Image
											src={PerformerImg1}
											alt={respondent.name}
											className="w-10 h-10 rounded-full shrink-0 overflow-hidden"
										/>
										<div className="grow">
											<h6 className="text-base mb-0 font-medium">{respondent.name}</h6>
											<span className="text-sm text-secondary-light font-medium">
												Agent ID: {respondent.email}
											</span>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<span className="text-gray-400">No respondents</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default RespondentsCard;
