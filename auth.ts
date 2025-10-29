import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
// import { getUserFromDb } from "./utils/db";
import { loginSchema } from "./lib/zod";
import { ZodError } from "zod";
import { loginUser } from "./config/auth-actions";
import toast from "react-hot-toast";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					const { email, password } = await loginSchema.parseAsync(credentials);
					const response = await axios.post(`${baseUrl}/v1/auth/login`, {
						email,
						password,
					});
					const user = { id: response.data.token, email: response.data.token };
					return user;
				} catch (error) {
					if (error instanceof ZodError) {
						return null;
					}
					return null;
				}
			},
		}),

		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
});
