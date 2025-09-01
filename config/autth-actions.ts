import type { AxiosResponse } from "axios";
import AxiosClient from "./axios-client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const verifyEmail = async (payload: VerifyEmailInterface): Promise<any> => {
	const url = "/api/resend-email-verification";
	try {
		const response: AxiosResponse<any> = await AxiosClient.post(url, payload);
		return response;
	} catch (error) {
		console.error("Verification failed:", error);
		throw error;
	}
};

export const registerBusiness = async (payload: RegisterBusinessInterface): Promise<any> => {
	const url = "/api/register-business";
	try {
		const response: AxiosResponse<any> = await AxiosClient.post(url, payload);
		return response;
	} catch (error) {
		console.error("Registration failed:", error);
		throw error;
	}
};

export const loginUser = async (payload: AgentLoginInterface): Promise<any> => {
	// const url = "/agent-login";
	const url = "/v1/auth/login";
	try {
		const response: AxiosResponse<any> = await AxiosClient.post(url, payload);
		return response;
	} catch (error) {
		console.error("Loign failed:", error);
		throw error;
	}
};
