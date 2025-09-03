import { z } from "zod";

// Password Schema Base
const passwordField = z
	.string({ required_error: "Password is required" })
	.min(8, { message: "Password must be more than 8 characters" })
	.max(15, { message: "Password must be less than 15 characters" })
	.regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
	// .regex(/[0-9]/, { message: "Contain at least one number." })
	.regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character." })
	.trim();

const phoneNumberField = z
	.string({ required_error: "Phone number is required" })
	.min(10, { message: "Phone number must be at least 10 digits" })
	.max(15, { message: "Phone number must be less than 15 digits" })
	.regex(/^[0-9\-\(\)\s+]+$/, {
		message: "Invalid phone number format.",
	})
	.trim();

// Email schema base
const emailField = z.string().min(1, "Email is required").email("Invalid email!");
const nameField = z.string().min(1, "Name is required");

// Login Schema
export const loginSchema = z.object({
	email: emailField,
	password: passwordField,
});

// Register Schema
export const registerSchema = z.object({
	email: emailField,
});
export const completeRegisterSchema = z
	.object({
		name: nameField,
		sponsorType: z.string().min(1, "Sponsor Type is required"),
		email: emailField,
		phoneNumber: phoneNumberField,
		state: nameField,
		lga: nameField,
		password: passwordField,
		confirmPassword: passwordField,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // 👈 attach error to confirmPassword field
	});

// export const registerSchema = loginSchema.extend({
// 	username: z.string().min(2, {
// 	  message: "Username must be at least 2 characters.",
// 	}),
// 	acceptTerms: z.literal(true, {
// 	  errorMap: () => ({ message: "You must accept the terms and conditions" }),
// 	}),
// });

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
	email: emailField,
});

// Create Password Schema
export const createPasswordSchema = z
	.object({
		password: passwordField,
		confirmPassword: z.string({
			required_error: "Confirm Password is required",
		}),
		acceptTerms: z.literal(true, {
			errorMap: () => ({ message: "You must accept the terms and conditions" }),
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password does not match",
		path: ["confirmPassword"],
	});

export const formSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().min(10, "Phone number is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export type FormSchemaType = z.infer<typeof formSchema>;
