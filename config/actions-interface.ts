interface VerifyEmailInterface {
	email: string;
}

interface RegisterBusinessInterface {
	full_name: string;
	email: string;
	password: string;
	phone: string;
	state: string;
	lga: string;
}

interface AgentLoginInterface {
	email: string;
	password: string;
}
