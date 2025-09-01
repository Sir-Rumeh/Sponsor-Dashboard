import type { AxiosResponse } from "axios";
import AxiosClient from "./axios-client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const verifyEmail = async (payload: VerifyEmailInterface): Promise<any> => {
	const url = "/resend-email-verification";
	try {
		const response: AxiosResponse<any> = await AxiosClient.post(url, payload);
		return response;
	} catch (error) {
		console.error("Verification failed:", error);
		throw error;
	}
};
