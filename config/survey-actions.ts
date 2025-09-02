import type { AxiosResponse } from "axios";
import AxiosClient from "./axios-client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getUserSurveys = async (page: number): Promise<any> => {
	try {
		const response: AxiosResponse<any> = await AxiosClient.get("/api/view-my-surveys", {
			params: { page },
		});
		return response;
	} catch (error) {
		console.error("Fetching survey failed:", error);
		throw error;
	}
};

export const viewSurveyDetails = async (id: number | string): Promise<any> => {
	try {
		const response: AxiosResponse<any> = await AxiosClient.get("/api/admin/view-survey_detail", {
			params: { survey_id: id },
		});
		return response;
	} catch (error) {
		console.error("Fetching survey details failed:", error);
		throw error;
	}
};

export const getSurveyRespondents = async (id: number | string): Promise<any> => {
	try {
		const response: AxiosResponse<any> = await AxiosClient.get("/api/admin/survey-responds-users", {
			params: { survey_id: id },
		});
		return response;
	} catch (error) {
		console.error("Fetching survey failed:", error);
		throw error;
	}
};

export const createSurvey = async (payload: CreateSurveyInterface): Promise<any> => {
	const url = "/api/add-survey";
	try {
		const response: AxiosResponse<any> = await AxiosClient.post(url, payload);
		return response;
	} catch (error) {
		console.error("Craete Survey failed:", error);
		throw error;
	}
};
export const addQuestionToSurvey = async (payload: AddSurveyQuestionsInterface): Promise<any> => {
	const url = "/api/add-questions";
	try {
		const response: AxiosResponse<any> = await AxiosClient.post(url, payload);
		return response;
	} catch (error) {
		console.error("Add question to survey failed:", error);
		throw error;
	}
};
