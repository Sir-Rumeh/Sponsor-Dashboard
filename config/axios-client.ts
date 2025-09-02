import { auth } from "@/auth";
import axios from "axios";
import toast from "react-hot-toast";

const AxiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
	headers: { "Content-Type": "application/json" },
});

AxiosClient.interceptors.request.use(
	async (request) => {
		if (!navigator.onLine) {
			throw new Error("Please check your Internet Connection");
		}
		try {
			const session = await auth();
			if (session) {
				const token = session.user?.id;
				request.headers.Authorization = `Token ${token}`;
			}
		} catch (error) {
			console.log("error:", error);
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

AxiosClient.interceptors.response.use(
	(response) => {
		const reponseData = response.data;
		console.log("response", response.data);
		if (response.status !== 200) {
			return;
		}
		return reponseData;
	},
	async (error) => {
		console.log("error response", error?.response);
		if (error?.response?.status === 400) {
			toast.error(error?.response?.data?.error ?? "Request failed");
		} else if (error?.response?.status === 401) {
			toast.error("Your session timed out, sign in again to continue");
			return Promise.reject(error);
			// dispatch(logout());
			// dispatch(uiStopLoading());
			// window.location.href = "/";
		} else if (error?.response?.status === 404) {
			toast.error(error?.response?.data?.error);
			return Promise.reject(error);
		} else if (error?.response?.status === 500) {
			// dispatch(uiStopLoading());
			toast.error("Something went wrong");
			return Promise.reject(error);
		} else {
			//  dispatch(uiStopLoading());
			toast.error(error?.response?.data?.error ? error.response.data.error : "Something went wrong");
			return Promise.reject(error);
		}
	}
);

export default AxiosClient;
