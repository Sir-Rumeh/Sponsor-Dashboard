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
			toast.error(error?.response?.data.message ?? "Request failed");
		} else if (error?.response?.status === 401) {
			// dispatch(logout());
			// dispatch(uiStopLoading());
			toast.error("Your session timed out, sign in again to continue");
			window.location.href = "/";
			return Promise.reject(error);
		} else if (error?.response?.status === 404) {
			toast.error(error?.response?.message);
			return Promise.reject(error);
		} else if (error?.response?.status === 500) {
			// dispatch(uiStopLoading());
			toast.error("Something went wrong");
			return Promise.reject(error);
		} else {
			//  dispatch(uiStopLoading());
			toast.error(error?.response?.data?.Message ? error.response.data.Message : "Something went wrong");
			return Promise.reject(error);
		}
	}
);

export default AxiosClient;
