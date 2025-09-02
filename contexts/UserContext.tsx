"use client";

import { auth } from "@/auth";
import { getLoggedInUser } from "@/config/auth-actions";
import axios from "axios";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

interface LoggedInUser {
	firstname: string;
	lastname: string;
	id: number;
	progress: number;
	progress_business: number;
	responses: number;
	redeemable: number;
	wallet: number;
	points: number;
	state: string;
	lga: string;
	settlement: string | null;
	marrital_status: string | null;
	household: string | null;
	education: string | null;
	income: string | null;
	mobile_ownership: string | null;
	montly_income: string | null; // notice typo from backend: "montly"
	bank_name: string | null;
	account_name: string | null;
	account_num: string | null;
	phone_number: string; // backend is returning with quotes → "\"0806...\"" (string anyway)
	email: string;
	sponsor_type: string | null;
	address: string | null;
	profile_pic: string;
	lat: number | null;
	log: number | null;
}

interface UserContextType {
	loggedInUser: LoggedInUser | null;
	setLoggedInUser: (user: LoggedInUser | null) => void;
	clearLoggedInUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userResponse = await axios.get("http://162.243.168.52:8000/api/user", {
					headers: {
						Authorization: `Token ${session?.user?.email}`,
					},
				});
				setLoggedInUser(userResponse.data.data);
			} catch (err) {
				console.error("Failed to fetch user:", err);
				setLoggedInUser(null);
			}
		};
		fetchUser();
	}, []);

	const clearLoggedInUser = () => setLoggedInUser(null);

	return (
		<UserContext.Provider value={{ loggedInUser, setLoggedInUser, clearLoggedInUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used inside UserProvider");
	}
	return context;
};
